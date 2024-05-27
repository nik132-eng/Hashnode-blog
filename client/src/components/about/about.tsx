import { Box, styled, Typography } from "@mui/material";

const Banner = styled(Box)`
  background-image: url(https://www.wallpapertip.com/wmimgs/23-236943_us-wallpaper-for-website.jpg);
  width: 100%;
  height: 50vh;
  background-position: left 0px bottom 0px;
  background-size: cover;
`;

const Wrapper = styled(Box)`
  padding: 20px;
  & > h3,
  & > h5 {
    margin-top: 50px;
  }
`;

const Text = styled(Typography)`
  color: #878787;
`;

const About = () => {
  return (
    <Box>
      <Banner />
      <Wrapper>
        <Typography variant="h3">Hashnode blog application</Typography>
        <Text variant="h5">
          Hashnode is a blogging platform designed specifically for developers.
          It offers a range of features that make it an ideal choice for
          developers looking to create a personal or team blog. With Hashnode,
          you can set up a custom domain in less than a minute at no cost, or
          use Hashnode's free sub-domain to start a blog immediately and switch
          to a custom domain later. One of the standout features of Hashnode is
          its Headless Mode with APIs, which allows you to integrate your blog
          into your existing websites and host it on a sub-path such as /blog.
          You can also utilize Hashnode APIs to fetch content for your main
          company website, personal portfolio, mobile apps, or other CMS
          platforms.
          <br></br>
          <br></br>
          Hashnode's writing editor is optimized for developers and includes a
          block-based WYSIWYG Markdown editor, in-line commenting, AI-assisted
          writing, advanced metadata, and real-time collaboration. These
          features make it easy for developers to collaborate on content and
          optimize it for visibility.
          <br></br>
          <br></br>
          For enterprises and teams, Hashnode offers a range of features
          including Headless mode for team blogs, AI-assisted writing for all
          team members, member management with various roles, real-time
          collaborative editing, inline commenting, SSO and custom SLAs, 99.9%
          uptime guarantee, and premium support.
          <br></br>
          <br></br>
          Overall, Hashnode is a powerful blogging platform that offers a range
          of features tailored to the needs of developers and teams. Its custom
          domain and Headless Mode with APIs make it a flexible and versatile
          choice for developers looking to create a personal or team blog.
        </Text>
      </Wrapper>
    </Box>
  );
};

export default About;
