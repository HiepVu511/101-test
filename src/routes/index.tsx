import { useQuery } from "react-query";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  Menu,
  Button,
  Radio,
  Group,
  Pagination,
  Select,
  Title,
  Flex,
} from "@mantine/core";
import { DateRangePicker } from "@adobe/react-spectrum";
import { DebounceInput } from "react-debounce-input";
import { toast } from "react-toastify";
import styled from "@emotion/styled";
import { parseDate } from "@internationalized/date";

import Spinner from "../components/Spinner";
import Invoices from "../components/Invoices";
import { invoiceQuery } from "../utils/api";
import CustomError from "../utils/error";

const SearchInput = styled(DebounceInput)`
  height: 2.25rem;
  -webkit-tap-highlight-color: transparent;
  line-height: calc(2.25rem - 0.125rem);
  appearance: none;
  resize: none;
  box-sizing: border-box;
  font-size: 0.875rem;
  width: 300px;
  color: #000;
  text-align: left;
  border: 0.0625rem solid #ced4da;
  background-color: #fff;
  transition: border-color 100ms ease;
  min-height: 2.25rem;
  padding-left: calc(2.25rem / 3);
  padding-right: calc(2.25rem / 3);
  border-radius: 0.25rem;
`;

const InvoicesRoute = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const keyword = searchParams.get("keyword") || undefined;
  const sortBy = searchParams.get("sortBy") || "createdAt";
  const sortOrder = searchParams.get("sortOrder") || "desc";
  const pageNum = searchParams.get("pageNum") || "1";
  const pageSize = searchParams.get("pageSize") || "20";
  const fromDate = searchParams.get("fromDate") || undefined;
  const toDate = searchParams.get("toDate") || undefined;

  const values = {
    keyword,
    sortBy,
    sortOrder,
    pageNum,
    pageSize,
    fromDate,
    toDate,
  };

  const { data, isLoading } = useQuery(
    ["invoices", values],
    () => invoiceQuery(values),
    {
      onError: (err) => {
        if (err instanceof CustomError && err.name === "TOKEN_EXPIRE") {
          navigate(`/login?reAuth=1`, { replace: true });
        } else {
          // Send error to Monitoring services like LogRocket or Sentry
          toast.error(
            "Something went wrong with our app. Please try again later."
          );
          console.log(err);
        }
      },
    }
  );

  const totalPageCount =
    data?.paging?.totalRecords &&
    Math.ceil(data.paging.totalRecords / parseInt(values.pageSize));

  return (
    <>
      <Title order={1} my={16}>
        Invoices
      </Title>
      {isLoading && <Spinner />}
      <Flex justify="space-between" mb={24}>
        <SearchInput
          placeholder="Search by keyword"
          debounceTimeout={400}
          value={values?.keyword || ""}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setSearchParams((params) => {
              params.set("keyword", e.target.value);

              return params;
            });
          }}
        />
        <div>
          <DateRangePicker
            // isDateUnavailable={(d) => console.log(d)}
            allowsNonContiguousRanges={false}
            aria-label="Filter by date range"
            onChange={(val) => {
              setSearchParams((params) => {
                params.set("fromDate", val.start.toString());
                params.set("toDate", val.end.toString());
                return params;
              });
            }}
            value={
              fromDate && toDate
                ? {
                    start: parseDate(fromDate),
                    end: parseDate(toDate),
                  }
                : undefined
            }
          />
          <Menu shadow="md" width={200}>
            <Menu.Target>
              <Button color="blue" ml={24}>
                Sort
              </Button>
            </Menu.Target>

            <Menu.Dropdown>
              <Menu.Label>Sort order</Menu.Label>
              <Radio.Group
                value={values?.sortOrder || "asc"}
                onChange={(val) => {
                  setSearchParams((params) => {
                    params.set("sortOrder", val);

                    return params;
                  });
                }}
              >
                <Group mt="xs">
                  <Radio value="asc" label="ASC" />
                  <Radio value="desc" label="DESC" />
                </Group>
              </Radio.Group>

              <Menu.Divider />

              <Menu.Label>Sort by</Menu.Label>
              <Radio.Group
                value={values?.sortBy || "createdAt"}
                onChange={(val) => {
                  setSearchParams((params) => {
                    params.set("sortBy", val);

                    return params;
                  });
                }}
              >
                <Group mt="xs">
                  <Radio value="createdAt" label="Created at" />
                  <Radio value="dueDate" label="Due date" />
                </Group>
              </Radio.Group>
            </Menu.Dropdown>
          </Menu>
        </div>
      </Flex>
      {data?.data && (
        <>
          <Invoices items={data.data} />
          {totalPageCount && (
            <Flex my={24} justify="space-between">
              <Pagination
                total={totalPageCount}
                value={parseInt(values.pageNum)}
                onChange={(val) => {
                  setSearchParams((params) => {
                    params.set("pageNum", val.toString());

                    return params;
                  });
                }}
              />
              <Select
                placeholder="Per page"
                data={["5", "10", "20", "50", "100"].map((i) => ({
                  value: i,
                  label: i,
                }))}
                onChange={(val) => {
                  setSearchParams((params) => {
                    if (val) params.set("pageSize", val);

                    return params;
                  });
                }}
              />
            </Flex>
          )}
        </>
      )}
    </>
  );
};

export default InvoicesRoute;
