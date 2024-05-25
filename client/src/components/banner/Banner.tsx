import { styled, Box, Typography } from '@mui/material';
import { FC } from 'react';

interface BannerProps {

}

const Image = styled(Box)`
  width: 100%;
  background: url("../../../public/banner.jpg") center/55%  #000;
  height: 50vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Heading = styled(Typography)`
  font-size: 70px;
  color: #FFFFFF;
  line-height: 1;
`;

const SubHeading = styled(Typography)`
  font-size: 20px;
  background: #FFFFFF;
`;

const Banner: FC<BannerProps> = () => {
  return (
    <Image>
      <Heading>Hashnode</Heading>
      <SubHeading>Best Blogging platform</SubHeading>
    </Image>
  );
};

export default Banner;