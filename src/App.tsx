import { Grid } from '@mui/material';
import './App.css'
import HeaderUI from '/workspaces/dashboard/src/assets/components/HeaderUI.tsx';
import AlertUI from '/workspaces/dashboard/src/assets/components/AlertUI.tsx';
import SelectorUI from '/workspaces/dashboard/src/assets/components/SelectorUI.tsx';
import IndicatorUI from '/workspaces/dashboard/src/assets/components/IndicatorUI.tsx'; // Importa IndicatorUI
import DataFetcher from './functions/DataFetcher';
import TableUI from '/workspaces/dashboard/src/assets/components/TableUI.tsx';
import ChartUI from '/workspaces/dashboard/src/assets/components/ChartUI.tsx';

function App() {
  const dataFetcherOutput = DataFetcher();

  return (
    <Grid container spacing={5} justifyContent="center" alignItems="center">
      {/* Encabezado */}
      <Grid size={{ xs: 12, md: 12 }}>
        <HeaderUI />
      </Grid>
      
      {/* Alertas */}
      <Grid size={{ xs: 12 }} container justifyContent="right" alignItems="center">
        <AlertUI 
          description="No se preveen lluvias"
          variant="filled"
          severity="info"
        />
      </Grid>
      
      {/* Selector */}
      <Grid size={{ xs: 12, md: 3 }}>
        <SelectorUI />
      </Grid>
      
      {/* Indicadores */}
      <Grid container size={{ xs: 12, md: 9 }}>
        {/* Renderizado condicional de los datos obtenidos */}
        {dataFetcherOutput.loading && (
          <Grid size={{ xs: 12 }}>
            <p>Cargando datos...</p>
          </Grid>
        )}
        {dataFetcherOutput.error && (
          <Grid size={{ xs: 12 }}>
            <p>Error: {dataFetcherOutput.error}</p>
          </Grid>
        )}
        {dataFetcherOutput.data && (
          <>
            <Grid size={{ xs: 12, md: 3 }}>
              <IndicatorUI
                title="Temperatura (2m)"
                description={
                  dataFetcherOutput.data.current_weather.temperature +
                  " " +
                  dataFetcherOutput.data.current_weather_units.temperature
                }
              />
            </Grid>
            <Grid size={{ xs: 12, md: 3 }}>
              <IndicatorUI
                title="Temperatura aparente"
                description="-"
              />
            </Grid>
            <Grid size={{ xs: 12, md: 3 }}>
              <IndicatorUI
                title="Velocidad del viento"
                description={
                  dataFetcherOutput.data.current_weather.windspeed +
                  " " +
                  dataFetcherOutput.data.current_weather_units.windspeed
                }
              />
            </Grid>
            <Grid size={{ xs: 12, md: 3 }}>
              <IndicatorUI
                title="Humedad relativa"
                description="-"
              />
            </Grid>
          </>
        )}
      </Grid>
      
      {/* Gráfico */}
      <Grid size={{ xs: 6, md: 6 }} sx={{ display: { xs: "none", md: "block" } }}>
        <ChartUI />
      </Grid>

      {/* Tabla */}
      <Grid size={{ xs: 6, md: 6 }} sx={{ display: { xs: "none", md: "block" } }}>
        <TableUI />
      </Grid>
      
      {/* Información adicional */}
      <Grid size={{ xs: 12, md: 12 }}>Elemento: Información adicional</Grid>
    </Grid>
  );
}

export default App;