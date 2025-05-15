import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Container } from "@mui/material";
import logoPng from "../assets/GK-logo.png";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import InstagramIcon from "@mui/icons-material/Instagram";
import TokenIcon from "@mui/icons-material/Token";

export default function About() {
  return (
    <Container
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        boxShadow: "revert",
      }}
    >
      <Card sx={{ width: 600, pt:3, mt:3 }}>
        <CardMedia
          sx={{ p: 1, objectFit: "contain", height: "250px" }}
          component="img"
          image={logoPng}
          title="Gokce Kemaloglu"
        />
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography gutterBottom variant="h5" component="div">
            Gokce Kemaloglu
          </Typography>
          <Typography gutterBottom variant="h5" component="div">
            FullStack Developer
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            I'm a passionate Full Stack Developer with expertise in building
            robust web applications from end to end. With a strong foundation in
            both frontend and backend technologies, I specialize in creating
            dynamic user experiences and efficient server-side solutions. I have
            a keen interest in modern JavaScript frameworks, responsive design,
            and cloud integration, ensuring that every project I work on is
            scalable, secure, and user-friendly. Whether it's developing sleek
            interfaces or architecting powerful APIs, I strive to deliver
            high-quality solutions that meet client needs and exceed
            expectations.
          </Typography>
        </CardContent>
        <CardActions sx={{
          display: "flex",
          justifyContent: "center",
          p: 1,
        }}>
          <Button
            component="a"
            size="small"
            href="https://www.linkedin.com/in/gokcekemaloglu/"
            target="_blank"
            title="LinkedIn"
          >
            <LinkedInIcon fontSize="large"/>
          </Button>
          <Button
            component="a"
            size="small"
            href="https://github.com/gokcekemaloglu"
            target="_blank"
            title="GitHub"
          >
            <GitHubIcon  fontSize="large"/>
          </Button>
          <Button
            component="a"
            size="small"
            href="https://www.instagram.com/gokce_kemaloglu/"
            target="_blank"
            title="Instagram"
          >
            <InstagramIcon fontSize="large"/>
          </Button>
          <Button component="a" size="small" href="#" target="_blank">
            <TokenIcon  fontSize="large"/>
          </Button>
        </CardActions>
      </Card>
    </Container>
  );
}
