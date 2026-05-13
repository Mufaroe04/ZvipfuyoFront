import { IonIcon } from "@ionic/react"
import { Box, Button, Chip, Divider, Grid, Paper, Stack, Typography } from "@mui/material"
import { addOutline, calendarOutline, heartOutline } from "ionicons/icons"
import { useBreedingList } from "../hooks/useBreedingList"


const BreedingBanner:React.FC=()=>{
    const { history,events,upcomingCalvings}=useBreedingList()

    return(
           <Box  sx={{ p:0 ,m:0}}>
          <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1, mt: 1 }}>
            <Box>
              <Typography variant="body1" fontWeight="bold">Reproduction Logs</Typography>
              <Typography variant="body2" color="text.secondary">Track inseminations and expected births</Typography>
            </Box>
            <Button 
              variant="contained" 
              startIcon={<IonIcon icon={addOutline} />}
              onClick={() => history.push("/reproduction/add")}
              sx={{ 
                borderRadius: '4px', 
                textTransform: 'none', 
                fontWeight: 'bold', 
                bgcolor: '#18774c',
                '&:hover': { bgcolor: '#14633f' }
              }}
            >
              Add Event
            </Button>
          </Stack>

          {/* Quick Stats & Upcoming Calvings */}
          <Grid container spacing={3} sx={{ mb: 1 }}>
            <Grid item xs={12} md={8}>
              <Paper elevation={0} sx={{ p: 3, borderRadius: '4px', border: '1px solid #ffffff', bgcolor: '#ffffff' }}>
                <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1 }}>
                  <Typography variant="body1" fontWeight="bold">Upcoming Calvings</Typography>
                  <Typography variant="body1" fontWeight="bold"  color="success" style={{ padding: '5px 10px', borderRadius: '4px' }}>
                    {upcomingCalvings.length} Expected
                  </Typography>
                </Stack>
                <Divider sx={{ mb: 1 }} />
                
                {upcomingCalvings.length > 0 ? (
                  <Stack spacing={2}>
                    {upcomingCalvings.slice(0, 3).map((event: any) => (
                      <Stack key={event.id} direction="row" justifyContent="space-between" alignItems="center">
                        <Box>
                          <Typography variant="subtitle2" fontWeight="bold">{event.animal_tag}</Typography>
                          <Typography variant="caption" color="text.secondary">
                            Exp. Date: {event.expected_calving_date}
                          </Typography>
                        </Box>
                        <Chip 
                          icon={<IonIcon icon={calendarOutline} />} 
                          label="Details" 
                          size="small" 
                          clickable 
                          variant="outlined" 
                        />
                      </Stack>
                    ))}
                  </Stack>
                ) : (
                  <Typography variant="body2" color="text.secondary">No calvings scheduled for the next 30 days.</Typography>
                )}
              </Paper>
            </Grid>

            <Grid item xs={12} md={4}>
              <Paper elevation={0} sx={{ p: 1, borderRadius: '4px', border: '1px solid #ececec', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', bgcolor: '#ffffff' }}>
                <IonIcon icon={heartOutline} style={{ fontSize: '2.5rem', color: '#eb445a', marginBottom: '10px' }} />
                <Typography variant="body1" fontWeight="bold" sx={{ color: '#18774c' }}>
                  {events.filter((e: any) => e.status === 'confirmed').length}
                </Typography>
                <Typography variant="overline" color="text.secondary" fontWeight="bold">
                  Confirmed Pregnancies
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </Box>
    )
}
export default BreedingBanner;