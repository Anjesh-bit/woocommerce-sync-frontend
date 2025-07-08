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
  rem,
} from "@mantine/core";

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
      size="xl"
      padding="xl"
      radius="md"
      styles={{
        header: {
          backgroundColor: "var(--mantine-color-gray-0)",
          borderBottom: `2px solid #FFD700`,
          marginBottom: 0,
        },
        body: {
          padding: 0,
        },
      }}
    >
      <Stack gap="lg" p="xl">
        <Grid>
          <Grid.Col span={6}>
            <Card
              withBorder
              radius="md"
              p="md"
              styles={{
                root: {
                  borderLeft: `4px solid #FFD700`,
                  transition: "all 0.2s ease",
                  "&:hover": {
                    boxShadow: "0 4px 12px rgba(255, 215, 0, 0.15)",
                  },
                },
              }}
            >
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
            <Card
              withBorder
              radius="md"
              p="md"
              styles={{
                root: {
                  borderLeft: `4px solid #FFD700`,
                  transition: "all 0.2s ease",
                  "&:hover": {
                    boxShadow: "0 4px 12px rgba(255, 215, 0, 0.15)",
                  },
                },
              }}
            >
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

        <Paper
          withBorder
          radius="md"
          p="md"
          styles={{
            root: {
              background: "linear-gradient(135deg, #fefefe 0%, #f8f9fa 100%)",
              border: `1px solid #e9ecef`,
            },
          }}
        >
          <Flex justify="space-between" align="center">
            <Group gap="md">
              <Box>
                <Text size="xs" tt="uppercase" fw={700} c="dimmed">
                  Status
                </Text>
                <Badge
                  color={statusColor}
                  variant="light"
                  radius="md"
                  size="lg"
                  styles={{
                    root: {
                      fontWeight: 600,
                      textTransform: "uppercase",
                      letterSpacing: "0.5px",
                    },
                  }}
                >
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
                <Text
                  size="xl"
                  fw={700}
                  c="dark.8"
                  styles={{
                    root: {
                      background: "linear-gradient(135deg, #FFD700 0%, #FFA500 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    },
                  }}
                >
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
          styles={{
            label: {
              fontSize: rem(14),
              fontWeight: 600,
            },
          }}
        />

        <Paper
          withBorder
          radius="md"
          p="md"
          styles={{
            root: {
              overflow: "hidden",
              border: `1px solid #e9ecef`,
            },
          }}
        >
          <Table
            striped
            highlightOnHover
            withTableBorder={false}
            styles={{
              th: {
                backgroundColor: "#f8f9fa",
                fontWeight: 700,
                fontSize: rem(12),
                textTransform: "uppercase",
                letterSpacing: "0.5px",
                color: "var(--mantine-color-dark-6)",
                borderBottom: `2px solid #FFD700`,
                padding: "12px 16px",
              },
              td: {
                padding: "16px",
                verticalAlign: "middle",
                borderBottom: "1px solid #f1f3f5",
              },
              tbody: {
                tr: {
                  transition: "all 0.2s ease",
                  "&:hover": {
                    backgroundColor: "rgba(255, 215, 0, 0.05)",
                  },
                },
              },
            }}
          >
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Product</Table.Th>
                <Table.Th ta="center">Quantity</Table.Th>
                <Table.Th ta="right">Unit Price</Table.Th>
                <Table.Th ta="right">Total</Table.Th>
                <Table.Th ta="center">Image</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {line_items.map(({ id, name = "Unnamed Product", quantity, total: itemTotal, image }) => (
                <Table.Tr key={id}>
                  <Table.Td>
                    <Text fw={600} c="dark.8">
                      {name}
                    </Text>
                  </Table.Td>
                  <Table.Td ta="center">
                    <Badge variant="light" color="blue" radius="md" size="sm">
                      {quantity}
                    </Badge>
                  </Table.Td>
                  <Table.Td ta="right">
                    <Text c="dark.6" fw={500}>
                      ${(Number(itemTotal) / Number(quantity)).toFixed(2)}
                    </Text>
                  </Table.Td>
                  <Table.Td ta="right">
                    <Text
                      fw={700}
                      c="dark.8"
                      styles={{
                        root: {
                          background: "linear-gradient(135deg, #FFD700 0%, #FFA500 100%)",
                          WebkitBackgroundClip: "text",
                          WebkitTextFillColor: "transparent",
                          backgroundClip: "text",
                        },
                      }}
                    >
                      ${Number(itemTotal).toFixed(2)}
                    </Text>
                  </Table.Td>
                  <Table.Td ta="center">
                    {image?.src ? (
                      <Image
                        src={image.src}
                        alt={name}
                        width={50}
                        height={50}
                        radius="md"
                        fallbackSrc="https://via.placeholder.com/50x50/f8f9fa/6c757d?text=No+Image"
                        styles={{
                          root: {
                            border: "2px solid #f1f3f5",
                            transition: "all 0.2s ease",
                            "&:hover": {
                              borderColor: "#FFD700",
                              transform: "scale(1.05)",
                            },
                          },
                        }}
                      />
                    ) : (
                      <Paper
                        w={50}
                        h={50}
                        radius="md"
                        bg="gray.1"
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          border: "2px solid #e9ecef",
                        }}
                      >
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

        <Paper
          withBorder
          radius="md"
          p="md"
          styles={{
            root: {
              background: "linear-gradient(135deg, #fff 0%, #f8f9fa 100%)",
              borderTop: `3px solid #FFD700`,
            },
          }}
        >
          <Group justify="space-between" align="center">
            <Text size="sm" c="dimmed">
              Order contains {itemCount} items
            </Text>
            <Group gap="md">
              <Text size="sm" c="dimmed">
                Subtotal:
              </Text>
              <Text
                size="lg"
                fw={700}
                c="dark.8"
                styles={{
                  root: {
                    background: "linear-gradient(135deg, #FFD700 0%, #FFA500 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  },
                }}
              >
                ${subtotal.toFixed(2)}
              </Text>
            </Group>
          </Group>
        </Paper>
      </Stack>
    </Modal>
  );
}
