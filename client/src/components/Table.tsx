import { useEffect, useState } from "react";
import {
  Table, Thead, TableContainer, Th, Tr, Tbody, Td, Tfoot, HStack,
  Stack, InputGroup, InputLeftElement, InputRightElement, Input
} from "@chakra-ui/react"
import { IoSearchCircle } from "react-icons/io5";
interface TableProps {
  tableHeads: string[],
  tableData: object[],
  heads: string[],
}

export default function JTable(props: TableProps) {

  const [ filteredRows , setFilteredRows] = useState<object[]>(props.tableData)

  const [ search , SetSearch ] = useState<string>('')

  useEffect(()=>{

    handleSearch()

  },[search])

  const handleSearch = () => {
    if(search.length > 2){
      let filtered = props.tableData.filter(row => {
        return Object.values(row).some(value => {
          return value.toString().toLowerCase().includes(search.toLowerCase())
        })
      })
      setFilteredRows(filtered)
    }else{
      setFilteredRows(props.tableData)
    }
  }

  return (
    <TableContainer>
      <HStack m={4}>
        <Stack>
          <InputGroup>
            <Input placeholder='Search...' value={search} onChange={(e)=>SetSearch(e.target.value)} />
            <InputRightElement>
              <IoSearchCircle />
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
    </TableContainer>
  )
}