import React, { useEffect, useState } from 'react';
// import ReactRouterDOM from 'react-router-dom';
// const { Link } = ReactRouterDOM;
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    width: "100%",
    background: "gold",
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
  },
  cover: {
    width: 125,
    height: 125,
  },
  myhref: {
    textDecoration: "none",
  },
  h1: {
    textAlign: "center",
  },
  fuckyou: {
    textDecoration: "none",
  }
}));

export default function AlbumCard() {
  const classes = useStyles();
  const [data, setData] = useState([])

  useEffect(() => {
    async function fetchAlbums() {
      const response = await fetch(
        // "http://192.168.0.91:9090/InitAlbumInfo"
        `http://192.168.0.91:9090/AlbumAlpha?alpha=A`
      );
      const fetchAlbumz = await response.json(response);
      console.log(fetchAlbumz)
      setData(fetchAlbumz);
    }
    fetchAlbums();
  }, []);

  console.log(data)
  
  function songIdToLocalStorage(albid, alb) {
    var albidd = JSON.stringify(albid);
    var albb = JSON.stringify(alb);
    localStorage.setItem('AlbumID', albidd);
    localStorage.setItem('album', albb);
  };

  return (
    <div >
      <h1 className={classes.h1}>Albums</h1>
      {data.map(item =>
        <div>
          <a href="/SongsForAlbum" className={classes.fuckyou} >
            <List spacing={3} key={item.AlbumID}>
              <ListItem onClick={() => songIdToLocalStorage(item.AlbumID, item.Album)} key={item.AlbumID}>
                <Card className={classes.root} key={item.AlbumID}>
                  <CardMedia
                    key={item.AlbumID}
                    className={classes.cover}
                    image={item.PicHttpAddr}
                    title="Live from space album cover"
                  />
                  <div className={classes.details}>
                    <CardContent className={classes.content} >
                      <Typography component="h5" variant="h5" >
                        {item.Album}
                      </Typography>
                      <Typography variant="subtitle1" color="textSecondary" >
                        {item.Artist}
                      </Typography>
                    </CardContent>
                  </div>
                </Card>
              </ListItem>
            </List>
          </a>
        </div>
      )}
    </div>
  );
}
