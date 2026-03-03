import { useEffect, useState } from "react";
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
} from "@mui/material";
import CountUp from "react-countup";

const BASE_URL = "http://localhost:3001";

function Home() {
  const [stats, setStats] = useState({
    students: 0,
    books: 0,
    borrow: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      const students = await fetch(
        `${BASE_URL}/students?page=1&limit=1`
      );
      const books = await fetch(
        `${BASE_URL}/books?page=1&limit=1`
      );
      const borrow = await fetch(
        `${BASE_URL}/borrow?page=1&limit=1`
      );

      const sData = await students.json();
      const bData = await books.json();
      const brData = await borrow.json();

      setStats({
        students: sData.total || 0,
        books: bData.total || 0,
        borrow: brData.total || 0,
      });
    };

    fetchStats();
  }, []);

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="80vh"
    >
      {/* Centered Title */}
      <Typography variant="h4" mb={5} textAlign="center">
        Dashboard
      </Typography>

      {/* Centered Grid Container */}
      <Box width="100%" maxWidth="1000px">
        <Grid container spacing={4} justifyContent="center">
          
          <Grid item xs={12} md={4}>
            <Card sx={{ textAlign: "center", p: 3 }}>
              <CardContent>
                <Typography variant="h6">
                  👨‍🎓 Total Students
                </Typography>
                <Typography variant="h3" color="primary">
                  <CountUp start={0} end={stats.students} duration={2} />
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card sx={{ textAlign: "center", p: 3 }}>
              <CardContent>
                <Typography variant="h6">
                  📚 Total Books
                </Typography>
                <Typography variant="h3" color="secondary">
                  <CountUp start={0} end={stats.books} duration={2} />
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card sx={{ textAlign: "center", p: 3 }}>
              <CardContent>
                <Typography variant="h6">
                  🔁 Borrow Records
                </Typography>
                <Typography variant="h3" color="success.main">
                  <CountUp start={0} end={stats.borrow} duration={2} />
                </Typography>
              </CardContent>
            </Card>
          </Grid>

        </Grid>
      </Box>
    </Box>
  );
}

export default Home;