import {Card, CardContent, Typography} from '@mui/material'  
import { LineChart } from "@mui/x-charts";
import './MoodChart.css'

const days = ['Mån', 'Tis', 'Ons', 'Tors', 'Fre', 'Lör', ' Söndag'];

const mood = [5, 8, 5, 8, 4, 6, 5];
const energy = [7, 6, 6, 6, 9, 5, 7];
const stress = [4, 4, 5, 3, 4, 4, 4];
const hoursSleept = [7, 7.5, 6.5, 8, 7, 7.5, 8];

export default function MoodChart(){
    return(
     <Card className='mood-chart-card'
            sx= {{
                    borderRadius: 3
                }}                           
     >
      <CardContent>
        <Typography variant="h6">
          Humör & Energi
        </Typography>
    <LineChart
        xAxis={[{
            scaleType: 'point',
            data: days
        }]}

        series={[
            {
                data: mood,
                label: 'Humör'
            },
            {
                data: energy,
                label: 'Energi'
            },
            {
                data: stress,
                label: 'Stress'
            },
            {
                data: hoursSleept,
                label: 'Sömn'
            }
        ]}
         height={300}
    />
     </CardContent>
    </Card>
    )
}