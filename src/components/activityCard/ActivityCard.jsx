import {Card, CardContent, Typography, Button} from '@mui/material'
import './ActivityCard.css'

export default function ActivityCard(){

const activities = [
  {
    name: 'Promenad',
    duration: '45 min',
    date: 'Idag'
  },
  {
    name: 'Styrketräning',
    duration: '1 h 15 min',
    date: 'Igår'
  },
  {
    name: 'Cykling',
    duration: '30 min',
    date: 'Mån'
  },
  {
    name: 'Yoga',
    duration: '40 min',
    date: 'Sön'
  },
  {
    name: 'Löpning',
    duration: '35 min',
    date: 'Lör'
  }
];

    return(
        <Card className="activity-card"
                sx= {{
                    borderRadius: 3
                }} 
            >
                <CardContent>
                    <Typography variant="h6">Aktiviteter</Typography>

                    <Button className='aktivity-button'
                        sx={{
                            backgroundColor: 'rgb(243, 229, 245)',
                            fontWeight: 'bold',
                            letterSpacing: '1px',
                        }}
                    >
                        +Lägg Till Aktivitet
                    </Button>

                    {activities.map((activity) => (
                    <Typography>{activity.name} {activity.duration} {activity.date}</Typography>
                    ))}

                </CardContent>
            </Card>
    )
}