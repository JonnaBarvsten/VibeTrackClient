import './StatCard.css'
import { Card, CardContent, Typography } from '@mui/material'

export default function StatCard() {
    return (
        <div className="stats-container">

            <Card className="stat-card"
                sx= {{
                    borderRadius: 3
                }} 
            >
                <CardContent>
                    <Typography>Humör</Typography>
                    <Typography>8/10</Typography>
                </CardContent>
            </Card>

            <Card className="stat-card"
                 sx= {{
                    borderRadius: 3
                }} 
            >
                <CardContent >
                    <Typography>Energi</Typography>
                    <Typography>5/10</Typography>
                </CardContent>
            </Card>

            <Card className="stat-card"
                 sx= {{
                    borderRadius: 3
                }} 
            >
                <CardContent>
                    <Typography>Stress</Typography>
                    <Typography>2/10</Typography>
                </CardContent>
            </Card>

            <Card className="stat-card"
                 sx= {{
                    borderRadius: 3
                }} 
            >
                <CardContent>
                    <Typography>Sömn</Typography>
                    <Typography>8 tim</Typography>
                </CardContent>
            </Card>

        </div>
    )
}