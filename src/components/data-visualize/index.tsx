"use client";

import { useState } from "react";
import { BasicStyleLayout } from "../_common/style/BasicLayout";
import ChartViewer from "./ChartViewer";
import EditableTable from "./EditableTable";
import { Container, Grid } from "@mui/material";
import ChartSelector from "./ChartSelector";

export type ChartType = "bar" | "line" | "pie";

const DataVisualizeContainer = () => {
  const [chartType, setChartType] = useState<ChartType>("bar");
  // const [headers, setHeaders] = useState<string[]>([]);
  // const [rowData, setRowData] = useState([]);

  const handleChangeChartType = (val: ChartType) => {
    setChartType(val);
  };

  return (
    <BasicStyleLayout>
      <Container>
        <ChartSelector
          selectedType={chartType}
          handleChange={handleChangeChartType}
        />
        <Grid container spacing={2}>
          <Grid>
            <ChartViewer />
          </Grid>
          <Grid>
            <EditableTable />
          </Grid>
        </Grid>
      </Container>
    </BasicStyleLayout>
  );
};

export default DataVisualizeContainer;
