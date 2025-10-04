import { Box, Typography, InputBase } from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';
import NetworkSwitch from '../../../components/NetworkSwitch';
import { useSelector } from 'react-redux';
import { styles } from '../styles';
import { useEffect, useState } from 'react';

export default function NavRight() {
  const user = useSelector((state) => state.user);
  const displayName = user?.user ? user.user.username : 'Guest';
  const isActive = user?.user?.status === 1;

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  const [typedGreeting, setTypedGreeting] = useState('');
  const fullText = `${getGreeting()}, ${displayName}`;
  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setTypedGreeting(fullText.slice(0, i + 1));
      i++;
      if (i === fullText.length) clearInterval(interval);
    }, 100);
    return () => clearInterval(interval);
  }, [fullText]);

  return (
    <Box sx={{ ...styles.container, display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: 3 }}>
      {/* Search */}
      <Box sx={{ ...styles.searchBox, display: { xs: 'none', md: 'flex' }, alignItems: 'center' }}>
        <SearchIcon sx={styles.searchIcon} />
        <InputBase placeholder="Search. . . . ." fullWidth sx={styles.searchInput} />
      </Box>

      {/* Network switch */}
      <NetworkSwitch sx={{ display: { xs: 'none', md: 'flex' } }} />

      {/* Avatar + Greeting */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Box sx={{ ...styles.userAvatar, backgroundColor: 'whitesmoke' }}>
          <Typography sx={styles.userAvatarText}>{displayName.charAt(0).toUpperCase()}</Typography>
          {isActive && <Box sx={styles.activeIndicator} />}
        </Box>
        <Box>
          <Typography sx={{ fontSize: 13, fontWeight: 500 }}>{typedGreeting}</Typography>
        </Box>
      </Box>
    </Box>
  );
}
