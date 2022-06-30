// @mui material components
import Grid from "@mui/material/Grid";
// Argon Dashboard 2 MUI components
import ArgonBox from "components/ArgonBox";

// Argon Dashboard 2 MUI example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DetailedStatisticsCard from "examples/Cards/StatisticsCards/DetailedStatisticsCard";
import SalesTable from "examples/Tables/SalesTable";
import GradientLineChart from "examples/Charts/LineCharts/GradientLineChart";

// Argon Dashboard 2 MUI base styles
import typography from "assets/theme/base/typography";

// Dashboard layout components
import Slider from "layouts/dashboard/components/Slider";

// Data
import gradientLineChartData from "layouts/dashboard/data/gradientLineChartData";
import React, { useEffect, useState } from "react";
import db from "firebase-config";
import moment from 'moment-timezone';


const Default = () => {

  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const today = new Date();
  const hourago = new Date(today.getTime() - (1000 * 60 * 60));
  const timestr = moment(hourago).tz('Asia/Bangkok').format('YYYY-MM-DD HH:mm:ssssss');

  //// get tim show on display total production plant
  const timepdt = moment(today).tz('Asia/Bangkok').format('YYYY-MM-DD HH:mm:ssssss');

  useEffect(() => {
    const getPostsFromFirebase = [];
    const subscriber = db
      .collection("FEMS_Mahachai")
      .where("MASTER_TAG", "==", "F")
      .where("TIMESTAMP", ">=", timestr)
      .onSnapshot((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          getPostsFromFirebase.push({
            ...doc.data(), //spread operator
            key: doc.id, // `id` given to us by Firebase
          });
        });
        setPosts(getPostsFromFirebase);
        setLoading(false);
        //setIsnotdata(0);
      });

    // return cleanup function
    return () => subscriber();
  }, [loading]); // empty dependencies array => useEffect only called once

  posts.sort();


  const pang = Object.values(posts.reduce((r, o) => (r[o.PRODUCTION_PLANT]
    ? (r[o.PRODUCTION_PLANT].OUTPUT_KG += o.OUTPUT_KG)
    : (r[o.PRODUCTION_PLANT] = { ...o }), r), {}));

  console.log(pang);

  pang.sort();

  const a = posts.reduce((a, v) => a = a + v.OUTPUT_KG, 0);
  console.log("a: " + a);
  const { size } = typography;
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <ArgonBox py={3}>
        <Grid container spacing={0} mb={3}>
          {pang.map((input, index) => {
            return (
              <div key={index}>
                <Grid item xs={12} md={6} lg={12}>
                  <DetailedStatisticsCard 
                    title= {pang[index].PRODUCTION_PLANT}
                    count={Math.round(((pang[index].OUTPUT_KG / 1000) + Number.EPSILON) * 100) / 100} 
                    icon={{ color: "info", component: <i className="ni ni-money-coins" /> }}
                    percentage={{ color: "success", count: "", text: pang[index].TIMESTAMP.substring(0, 19) }}
                  />
                </Grid>
              </div>
            )
          })}
        </Grid>
        <Grid container spacing={3} mb={3}>
          <Grid item xs={12} lg={7}>
            <GradientLineChart
              title="Production Plant"

              chart={gradientLineChartData}
            />
          </Grid>
          <Grid item xs={12} lg={5}>
            <Slider />
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <SalesTable title="Chart" />
          </Grid>
        </Grid>
      </ArgonBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Default;
