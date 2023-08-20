
import { Box, Card, CardActionArea, CardContent, CardMedia, Grid, Paper, styled, Typography } from '@mui/material';
import Image from "next/image";
import React from 'react'
import menuData from '../../data/menu.json'
import {useRouter} from 'next/router';


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "rgb(17, 24, 39)",
  padding: theme.spacing(2),
  textAlign: "center",
  color: "rgb(209, 213, 219)",
  border: "1px solid rgb(45, 55, 72)",
}));

export default function MainMenu() {
  const {item,description}=menuData;
  const router = useRouter();
  const clickHandle=(url:string)=>{
router.push(url)
  }
  return (
    <div>
      <Grid container spacing={2}>
        {item.map((item) => {
          return (
            <Grid item key={item.title} xs={12} sm={6} md={6} lg={4}>
              {/* <Link href={item.page}> */}
              <Card
                onClick={()=>clickHandle(item.page)}
                style={{
                  backgroundColor: "rgb(31, 41, 55)",
                  color: "rgb(209, 213, 219)",
                  border: "2px solid rgb(45, 55, 72)",
                }}
              >
                <CardActionArea>
                  <CardContent>
                    <Typography
                      variant="h4"
                      component="div"
                      align="center"
                      sx={{ letterSpacing: 1.4, fontWeight: 600 }}
                    >
                      {item.title}
                    </Typography>
                  </CardContent>
                  <Box
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Image
                      // src={item.src}
                      src={item.src}
                      alt={"Card Logo"}
                      width={700}
                      height={400}
                    ></Image>
                  </Box>
                </CardActionArea>
              </Card>
              {/* </Link> */}
            </Grid>
          );
        })}
      </Grid>
      <Typography variant="h6" sx={{margin:2,paddingTop:3,fontWeight:700 ,color: "rgb(209, 213, 219)",letterSpacing:1.4}}>{description.value}</Typography>
    </div>
  );
}

