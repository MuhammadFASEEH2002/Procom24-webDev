import { useEffect, useState } from "react";
import {
  Table, Thead, TableContainer, Th, Tr, Tbody, Td, Tfoot, HStack,
  Stack, InputGroup, Select, InputRightElement, Input, Text, Button
} from "@chakra-ui/react"
import { IoSearchCircle } from "react-icons/io5";
import { GrNext, GrPrevious } from "react-icons/gr";


interface TableProps {
  tableHeads: string[],
  tableData: object[],
  heads: string[],
}

export default function JTable(props: TableProps) {

  const [filteredRows, setFilteredRows] = useState<object[]>(props.tableData)

  const length = props.tableData.length

  const [search, SetSearch] = useState<string>('')

  const [displayPage , setDisplayPage] = useState<string>('1 to 10')

  const [showCount, setShowCount] = useState<number>(10)

  const [page, setPage] = useState<number>(1)

  useEffect(() => {

    handleSearch()

  }, [search])

  useEffect(() => {

    setFilteredRows(DisplayRowsByPageCount(props.tableData))

  }, [page, showCount])

  const handleSearch = () => {
    if (search.length > 2) {
      let filtered = props.tableData.filter(row => {
        return Object.values(row).some(value => {
          return value.toString().toLowerCase().includes(search.toLowerCase())
        })
      })
      setFilteredRows(filtered)
    } else {
      setFilteredRows(DisplayRowsByPageCount(props.tableData))
    }
  }


  const DisplayRowsByPageCount = (array: Object[]) => {
    
    const totalDisplayRows = page * showCount;
    const startIndex = (page - 1) * showCount;
    const endIndex = totalDisplayRows > array.length ? array.length : totalDisplayRows;
    
    if(endIndex > array.length){
     return array.slice(startIndex, array.length);
    }
    
    setDisplayPage(`${startIndex} to ${endIndex}`)
    return array.slice(startIndex, endIndex);
  }

  return (
    <TableContainer>
      <HStack m={4} justifyContent={'space-between'}>
        <Stack>
          <Select size='lg' onChange={(e) => setShowCount(Number(e.target.value))}  >
            <option value='10' >10</option>
            <option value='25'>25</option>
            <option value='50'>50</option>
          </Select>
        </Stack>

        <Stack>
          <InputGroup>
            <Input placeholder='Search...' value={search} onChange={(e) => SetSearch(e.target.value)} />
            <InputRightElement>
              <IoSearchCircle size={22} />
            </InputRightElement>
          </InputGroup>
        </Stack>
      </HStack>
      <Table size='lg'>
        <Thead>
          <Tr>
            {props.tableHeads.map(head => (
              <Th key={head}>{head}</Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          {filteredRows.map((row, index) => (
            <Tr key={index.toString()}>
              {props.heads.map(head => (
                //@ts-ignore
                <Td key={head}>{row[head]}</Td>
              ))}
            </Tr>
          ))}
        </Tbody>
        <Tfoot>
          <Tr>
            {props.tableHeads.map(head => (
              <Th key={head}>{head}</Th>
            ))}
          </Tr>
        </Tfoot>
      </Table>
      <HStack justify={'space-between'} >
        <Text> Showing {displayPage} of {length} </Text>
        <HStack>
          <Button leftIcon={<GrPrevious />} colorScheme='teal' variant='outline' onClick={() => setPage(page - 1)} >
            Prev
          </Button>
          <Text>Page {page}</Text>
          <Button leftIcon={<GrNext />} colorScheme='teal' variant='outline'onClick={() => setPage(page + 1)} >
            Next
          </Button>
        </HStack>
      </HStack>
    </TableContainer>
  )
}