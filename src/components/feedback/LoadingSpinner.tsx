import { IonSpinner } from "@ionic/react"
import { Box } from "@mui/material"

export const LoadingSpinner: React.FC = () =>{

    return(
    <Box display="flex" justifyContent="center" alignItems="center" height="400px">
      <IonSpinner name="crescent" color="primary" />
    </Box>
    )

}

 