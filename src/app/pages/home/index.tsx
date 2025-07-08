import { Box, Text, Title, ThemeIcon } from "@mantine/core";
import { Link } from "react-router-dom";

import styles from "./home.module.css";
import { PackageSvg, ProductSvg } from "../../../assets/static/icons";

const Home = () => {
  return (
    <Box className={styles.container}>
      <Title className={styles.title} order={2}>
        Welcome to the Dashboard
      </Title>
      <Text className={styles.subtitle}>Manage your products and orders with ease.</Text>

      <Box className={styles.cardGroup}>
        <Box component={Link} to="/products" className={styles.card} tabIndex={0}>
          <ThemeIcon size="lg" radius="md" variant="gradient" gradient={{ from: "#FFD700", to: "#FFA500", deg: 45 }}>
            <ProductSvg />
          </ThemeIcon>
          <Text className={styles.cardText}>Manage Products</Text>
        </Box>

        <Box component={Link} to="/orders" className={styles.card} tabIndex={0}>
          <ThemeIcon size="lg" radius="md" variant="gradient" gradient={{ from: "#FFD700", to: "#FFA500", deg: 45 }}>
            <PackageSvg />
          </ThemeIcon>
          <Text className={styles.cardText}>View Orders</Text>
        </Box>
      </Box>
    </Box>
  );
};

export default Home;
