import {
  Modal,
  Table,
  Text,
  Image,
  Stack,
  Badge,
  Group,
  Divider,
  Card,
  ThemeIcon,
  Box,
  Paper,
  Title,
  Grid,
  Flex,
} from "@mantine/core";

import styles from "./order-details.module.css";
import { OrderDetailsModalProps } from "./order-details.types";
import {
  UserSvg,
  CalendarSvg,
  ShoppingCartSvg,
  PackageSvg,
  CurrencyDollarSvg,
} from "../../../assets/static/icons/index";
import { ORDER_STATUSES } from "../../pages/order/order.constant";

export function OrderDetailModal({ order, opened, onClose }: OrderDetailsModalProps) {
  if (!order) return null;

  const {
    number,
    billing: { first_name = "", last_name = "" } = {},
    status,
    date_created,
    line_items = [],
    total = 0,
  } = order;

  const customerName = `${first_name} ${last_name}`.trim() || "N/A";

  const formattedDate = new Date(date_created).toLocaleString("en-US", {
    dateStyle: "full",
    timeStyle: "short",
  });

  const { label: statusLabel, color: statusColor } = ORDER_STATUSES[status] ?? {
    label: status,
    color: "gray",
  };

  const subtotal = line_items.reduce((sum, item) => sum + Number(item.total || 0), 0);
  const itemCount = line_items.reduce((sum, item) => sum + Number(item.quantity || 0), 0);

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      size="xl"
      padding="xl"
      radius="md"
      title={
        <Group gap="md">
          <ThemeIcon size="lg" radius="md" variant="gradient" gradient={{ from: "#FFD700", to: "#FFA500", deg: 45 }}>
            <PackageSvg />
          </ThemeIcon>
          <Box>
            <Title order={3} c="dark.8">
              Order #{number}
            </Title>
            <Text size="sm" c="dimmed">
              Order Details & Items
            </Text>
          </Box>
        </Group>
      }
      styles={{
        header: { className: styles["modal-header"] },
        body: { className: styles["modal-body"] },
      }}
    >
      <Stack gap="lg" p="xl">
        <Grid>
          <Grid.Col span={6}>
            <Card withBorder radius="md" p="md" className={styles["card-root"]}>
              <Group gap="sm">
                <ThemeIcon size="md" radius="md" variant="light" color="blue">
                  <UserSvg />
                </ThemeIcon>
                <Box>
                  <Text size="xs" tt="uppercase" fw={700} c="dimmed">
                    Customer
                  </Text>
                  <Text fw={600} c="dark.8">
                    {customerName}
                  </Text>
                </Box>
              </Group>
            </Card>
          </Grid.Col>

          <Grid.Col span={6}>
            <Card withBorder radius="md" p="md" className={styles["card-root"]}>
              <Group gap="sm">
                <ThemeIcon size="md" radius="md" variant="light" color="teal">
                  <CalendarSvg />
                </ThemeIcon>
                <Box>
                  <Text size="xs" tt="uppercase" fw={700} c="dimmed">
                    Order Date
                  </Text>
                  <Text fw={600} c="dark.8">
                    {formattedDate}
                  </Text>
                </Box>
              </Group>
            </Card>
          </Grid.Col>
        </Grid>

        <Paper withBorder radius="md" p="md" className={styles["paper-root"]}>
          <Flex justify="space-between" align="center">
            <Group gap="md">
              <Box>
                <Text size="xs" tt="uppercase" fw={700} c="dimmed">
                  Status
                </Text>
                <Badge color={statusColor} variant="light" radius="md" size="lg" className={styles["status-badge"]}>
                  {statusLabel}
                </Badge>
              </Box>

              <Divider orientation="vertical" />

              <Box>
                <Text size="xs" tt="uppercase" fw={700} c="dimmed">
                  Total Items
                </Text>
                <Group gap="xs">
                  <ThemeIcon size="sm" radius="sm" variant="light" color="orange">
                    <ShoppingCartSvg />
                  </ThemeIcon>
                  <Text fw={600} c="dark.8">
                    {itemCount} items
                  </Text>
                </Group>
              </Box>
            </Group>

            <Box ta="right">
              <Text size="xs" tt="uppercase" fw={700} c="dimmed">
                Order Total
              </Text>
              <Group gap="xs" justify="flex-end">
                <ThemeIcon
                  size="sm"
                  radius="sm"
                  variant="gradient"
                  gradient={{ from: "#FFD700", to: "#FFA500", deg: 45 }}
                >
                  <CurrencyDollarSvg />
                </ThemeIcon>
                <Text size="xl" fw={700} c="dark.8" className={styles["gradient-text"]}>
                  ${Number(total).toFixed(2)}
                </Text>
              </Group>
            </Box>
          </Flex>
        </Paper>

        <Divider
          label={
            <Group gap="xs">
              <ThemeIcon size="sm" radius="sm" variant="light" color="orange">
                <PackageSvg />
              </ThemeIcon>
              <Text fw={600} c="dark.7">
                Order Items
              </Text>
            </Group>
          }
          labelPosition="center"
          className={styles["divider-label"]}
        />

        <Paper withBorder radius="md" p="md" className={styles["paper-root-alt"]}>
          <Table striped highlightOnHover withTableBorder={false}>
            <Table.Thead>
              <Table.Tr>
                <Table.Th className={styles["table-th"]}>Product</Table.Th>
                <Table.Th className={styles["table-th"]} ta="center">
                  Quantity
                </Table.Th>
                <Table.Th className={styles["table-th"]} ta="right">
                  Unit Price
                </Table.Th>
                <Table.Th className={styles["table-th"]} ta="right">
                  Total
                </Table.Th>
                <Table.Th className={styles["table-th"]} ta="center">
                  Image
                </Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {line_items.map(({ id, name = "Unnamed Product", quantity, total: itemTotal, image }) => (
                <Table.Tr key={id} className={styles["table-row"]}>
                  <Table.Td className={styles["table-td"]}>
                    <Text fw={600} c="dark.8">
                      {name}
                    </Text>
                  </Table.Td>
                  <Table.Td className={styles["table-td"]} ta="center">
                    <Badge variant="light" color="blue" radius="md" size="sm">
                      {quantity}
                    </Badge>
                  </Table.Td>
                  <Table.Td className={styles["table-td"]} ta="right">
                    <Text c="dark.6" fw={500}>
                      ${(Number(itemTotal) / Number(quantity)).toFixed(2)}
                    </Text>
                  </Table.Td>
                  <Table.Td className={styles["table-td"]} ta="right">
                    <Text fw={700} c="dark.8" className={styles["gradient-text"]}>
                      ${Number(itemTotal).toFixed(2)}
                    </Text>
                  </Table.Td>
                  <Table.Td className={styles["table-td"]} ta="center">
                    {image?.src ? (
                      <Image
                        src={image.src}
                        alt={name}
                        width={50}
                        height={50}
                        radius="md"
                        fallbackSrc="https://via.placeholder.com/50x50/f8f9fa/6c757d?text=No+Image"
                        className={styles["image-root"]}
                      />
                    ) : (
                      <Paper w={50} h={50} radius="md" bg="gray.1" className={styles["image-placeholder"]}>
                        <Text size="xs" c="dimmed" fw={500}>
                          N/A
                        </Text>
                      </Paper>
                    )}
                  </Table.Td>
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>
        </Paper>

        <Paper withBorder radius="md" p="md" className={styles["paper-root-summary"]}>
          <Group justify="space-between" align="center">
            <Text size="sm" c="dimmed">
              Order contains {itemCount} items
            </Text>
            <Group gap="md">
              <Text size="sm" c="dimmed">
                Subtotal:
              </Text>
              <Text size="lg" fw={700} c="dark.8" className={styles["gradient-text"]}>
                ${subtotal.toFixed(2)}
              </Text>
            </Group>
          </Group>
        </Paper>
      </Stack>
    </Modal>
  );
}
