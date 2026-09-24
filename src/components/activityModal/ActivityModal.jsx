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

export default function ActivityModal({
    open,
    onClose,
    onSave,
    todayLog
}) {
    const [activity, setActivity] = useState("");
    const [duration, setDuration] = useState("");

    const handleClose = () => {
        setActivity("");
        setDuration("");
        onClose();
    };

    const handleSubmit = async () => {

        if (!activity.trim() || !duration || !todayLog?.id) {
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
        >
            <DialogTitle>
                Lägg till aktivitet
            </DialogTitle>

            <DialogContent dividers>

                <TextField
                    fullWidth
                    label="Aktivitet"
                    value={activity}
                    onChange={(e) => setActivity(e.target.value)}
                    sx={{ mb: 3 }}
                />

                <TextField
                    fullWidth
                    type="number"
                    label="Varaktighet (minuter)"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
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
                >
                    Lägg till
                </Button>

            </DialogActions>
        </Dialog>
    );
}