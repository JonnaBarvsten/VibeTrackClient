import { useState } from "react";
import {
    Dialog,
    DialogTitle,
    DialogActions,
    DialogContent,
    TextField,
    Button,
} from "@mui/material";
import { createActivity } from "../../services/ActivityService";

export default function ActivityModal({open, onClose, onSave, todayLog }) {

    const [activity, setActivity] = useState("");
    const [duration, setDuration] = useState("");

    const [activityError, setActivityError] = useState(false);
    const [durationError, setDurationError] = useState(false);

    const handleClose = () => {
        setActivity("");
        setDuration("");

        setActivityError(false);
        setDurationError(false);

        onClose();
    };

    const handleSubmit = async () => {

        const activityIsEmpty = !activity.trim();
        const durationIsEmpty = !duration;

        setActivityError(activityIsEmpty);
        setDurationError(durationIsEmpty);

        if (activityIsEmpty || durationIsEmpty || !todayLog?.id) {
            return;
        }

        try {
            const activityDto = {
                activityType: activity,
                totalTimeMinutes: Number(duration),
                dailyLogId: Number(todayLog.id)
            };

            await createActivity(activityDto);

            if (onSave) {
                await onSave();
            }

            setActivity("");
            setDuration("");

            setActivityError(false);
            setDurationError(false);

            onClose();

        } catch (error) {
            console.error("Fel vid sparande av aktivitet", error);
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
            <DialogTitle>
                Lägg till aktivitet
            </DialogTitle>
            <DialogContent dividers>
                <TextField
                    fullWidth
                    label="Aktivitet"
                    value={activity}
                    error={activityError}
                    helperText={
                        activityError
                            ? "Du måste fylla i aktivitet"
                            : ""
                    }
                    onChange={(e) => {setActivity(e.target.value);

                        if (e.target.value.trim()) {
                            setActivityError(false);
                        }
                    }}
                    sx={{
                        mt: 1,
                        mb: 3
                    }}
                />
                <TextField
                    fullWidth
                    type="number"
                    label="Varaktighet (minuter)"
                    value={duration}
                    error={durationError}
                    helperText={
                        durationError
                            ? "Du måste fylla i varaktighet"
                            : ""
                    }
                    onChange={(e) => {setDuration(e.target.value);

                        if (e.target.value) {
                            setDurationError(false);
                        }
                    }}
                    slotProps={{
                        htmlInput: {
                            min: 1,
                            max: 1440
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
                    Lägg till
                </Button>
            </DialogActions>
        </Dialog>
    );
}