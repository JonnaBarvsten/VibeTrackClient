import { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  Typography,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Slider,
} from "@mui/material";

import {
  getMoods,
  createDailyStat,
  updateDailyStat,
} from "../../services/DailyStatService";

import {
  createMoodLog,
  updateMoodLog
} from "../../services/MoodLogService";

export default function StatModal({ open, onClose, todayLog, onSave }) {

  const [moods, setMoods] = useState([]);

  useEffect(() => {
    getMoods()
      .then((data) => {
        setMoods(data || []);
      })
      .catch((err) =>
        console.error("Kunde inte hämta humör", err)
      );
  }, []);

  const defaultMood = moods.length > 0 ? moods[0].id : 1;

  const initialMoodId =todayLog?.dailyStats?.moodLogs?.[0]?.mood ?? defaultMood;
  const initialEnergy =todayLog?.dailyStats?.moodLogs?.[0]?.energyLevel ?? 3;
  const initialStress =todayLog?.dailyStats?.moodLogs?.[0]?.stressLevel ?? 3;
  const initialSleep =todayLog?.dailyStats?.hoursOfSleep ?? 8;

  const [moodId, setMoodId] = useState(initialMoodId);
  const [energyLevel, setEnergyLevel] = useState(initialEnergy);
  const [stressLevel, setStressLevel] = useState(initialStress);
  const [sleep, setSleep] = useState(initialSleep);

  const [prevOpen, setPrevOpen] = useState(open);

  if (open !== prevOpen) {
    setPrevOpen(open);

    if (open) {
      setMoodId(initialMoodId);
      setEnergyLevel(initialEnergy);
      setStressLevel(initialStress);
      setSleep(initialSleep);
    }
  }

  const handleClose = () => {
    document.activeElement?.blur();
    onClose();
  };

  const handleSubmit = async () => {
    try {

      const formData = {
        dailyLogId: todayLog?.id ? Number(todayLog.id) : 0,
        hoursOfSleep: Number(sleep)
      };

      if (todayLog) {
        await updateDailyStat(
          todayLog.dailyStats.id,
          formData
        );

        const moodLog =
          todayLog.dailyStats.moodLogs?.[0];

        if (moodLog) {
          await updateMoodLog(moodLog.id, {
            mood: Number(moodId) || defaultMood,
            energyLevel: Number(energyLevel),
            stressLevel: Number(stressLevel),
          });

        } else {
          await createMoodLog({
            dailyStatsId: todayLog.dailyStats.id,
            mood: Number(moodId) || defaultMood,
            energyLevel: Number(energyLevel),
            stressLevel: Number(stressLevel),
          });

        }

      } else {

        const savedStat = await createDailyStat(formData);

        await createMoodLog({
          dailyStatsId: savedStat.id,
          mood: Number(moodId) || defaultMood,
          energyLevel: Number(energyLevel),
          stressLevel: Number(stressLevel),
        });
      }

      if (onSave) {
        await onSave();
      }

      document.activeElement?.blur();
      onClose();

    } catch (error) {
      console.error("Fel vid sparande", error);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth
      maxWidth="sm"
      slotProps={{
        paper: {
          sx: {
            borderRadius: 3
          }
        }
      }}
    >

      <DialogTitle
        sx={{
          color: '#3F354D',
          fontWeight: 600
        }}
      >
        {todayLog ? "Redigera dagens logg" : "Logga idag"}
      </DialogTitle>

      <DialogContent
        dividers
        sx={{ pt: 3 }}
      >

        <Typography
          variant="body2"
          sx={{ mb: 1 }}
        >
          Humör
        </Typography>

        <FormControl fullWidth>

          <InputLabel>Humör</InputLabel>

          <Select
            value={moodId ? Number(moodId) : ""}
            label="Humör"
            onChange={(e) =>
              setMoodId(Number(e.target.value))
            }
          >

            {moods.map((mood) => (
              <MenuItem
                key={mood.id}
                value={Number(mood.id)}
              >
                {mood.name}
              </MenuItem>
            ))}

          </Select>

        </FormControl>

        <Typography
          variant="body2"
          sx={{ mt: 3, mb: 1 }}
        >
          Energi
        </Typography>

        <Slider
          value={energyLevel}
          min={1}
          max={5}
          step={1}
          marks
          valueLabelDisplay="on"
          onChange={(e, newValue) =>
            setEnergyLevel(newValue)
          }
          sx={{
            color: '#6f5f8f'
          }}
        />

        <Typography
          variant="caption"
          sx={{
            color: '#625A6B'
          }}
        >
          1 = Helt Slut! &nbsp;&nbsp;&nbsp;
          5 = DUNDER!
        </Typography>

        <Typography
          variant="body2"
          sx={{ mt: 3, mb: 1 }}
        >
          Stress
        </Typography>

        <Slider
          value={stressLevel}
          min={1}
          max={5}
          step={1}
          marks
          valueLabelDisplay="on"
          onChange={(e, newValue) =>
            setStressLevel(newValue)
          }
          sx={{
            color: '#6f5f8f'
          }}
        />

        <Typography
          variant="caption"
          sx={{
            color: '#625A6B'
          }}
        >
          1 = Ingen Stress &nbsp;&nbsp;&nbsp;
          5 = Kritisk Stress!
        </Typography>

        <Typography
          variant="body2"
          sx={{ mt: 3, mb: 1 }}
        >
          Sömn
        </Typography>

        <TextField
          fullWidth
          type="text"
          value={sleep}
          onChange={(e) => {
            const value = e.target.value;

            if (/^\d*\.?\d*$/.test(value)) {
              setSleep(value);
            }
          }}
          slotProps={{
            htmlInput: {
              inputMode: "decimal"
            }
          }}
        />

      </DialogContent>

      <DialogActions>

        <Button
          color="inherit"
          onClick={handleClose}
        >
          Avbryt
        </Button>

        <Button
          variant="contained"
          onClick={handleSubmit}
          sx={{
            backgroundColor: '#6f5f8f',
            borderRadius: 2,
            '&:hover': {
              backgroundColor: '#594b75'
            }
          }}
        >
          Spara
        </Button>

      </DialogActions>

    </Dialog>
  );
}