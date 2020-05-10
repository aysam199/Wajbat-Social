import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import HomeIcon from '@material-ui/icons/Home';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import AddBoxIcon from '@material-ui/icons/AddBox';
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import Link from '@material-ui/core/Link';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles({
  root: {
    width: '100%',
    background: 'white',
    boxShadow: '0px -8px 49px -25px rgba(96,125,111,1)',
    display: 'flex',
    justifyContent: 'space-evenly',
    position: 'fixed',
    bottom: 0
  },
  icons: {
    fontSize: 32,
    boxShadow: '33px 33px 37px -39px rgba(17,20,19,1)'
  },
  label: {
    color: '#21b5a2'
  }
});

export default function MainFooter({ isLoggedIn }) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const history = useHistory();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const movesignin = () => {
    history.push('/signin');
  };

  return (
    <div>
      <BottomNavigation value={value} onChange={handleChange} className={classes.root}>
        <Link href="/">
          <BottomNavigationAction label="Home" value="home" className={classes.label} icon={<HomeIcon className={classes.icons} />} />
        </Link>
        <Link href={isLoggedIn ? '/profile?name=userFavorites' : '/signin'}>
          <BottomNavigationAction
            label="userFavorites"
            value="userFavorites"
            className={classes.label}
            icon={<FavoriteBorderIcon className={classes.icons} />}
          />
        </Link>
        <Link href={isLoggedIn ? '/AddPost' : '/signin'}>
          <BottomNavigationAction label="Add Post" value="post" className={classes.label} icon={<AddBoxIcon className={classes.icons} />} />
        </Link>
        <Link href={isLoggedIn ? '/Profile' : '/signin'}>
          <BottomNavigationAction label="Profile" value="profile" className={classes.label} icon={<PermIdentityIcon className={classes.icons} />} />
        </Link>
      </BottomNavigation>
    </div>
  );
}
