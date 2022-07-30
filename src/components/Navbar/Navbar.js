import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { Link, NavLink  } from 'react-router-dom';


const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

const Navbar = () => {
  const pages = [
    {
      name:'Dashboard',
      path: '/dashboard',
    }, 
    {
      name:'Fazendas',
      path: '/listaFazenda',
    }];

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>

          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'flex' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            LOGOoo
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'flex' } }}>
          {pages.map((page) => (
            <NavLink to={page.path} key={page.name}>
              <Button 
                
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                
                  {page.name}
                
                
              </Button>
              </NavLink>
            ))}
          </Box>

         
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Navbar;
