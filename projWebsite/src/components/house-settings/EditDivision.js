import React from "react";
import {
    Button,
Card,
CardHeader,
ListGroup,

} from "shards-react";
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';


const StyledTableCell = withStyles((theme) => ({
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    body: {
      
      fontSize: 14,
    },
  }))(TableCell);
  
  const StyledTableRow = withStyles((theme) => ({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
      },
    },
  }))(TableRow);
  



class EditDivision extends React.Component{
  constructor() {
    super();
    this.OPTIONS = [{ id: 0 , name : "Daniel",checked:true }, {id: 1 , name : "Leandro",checked:true },{ id : 2 , name : "Chico", checked:true }, 
    {id : 3 , name : "Bruno" , checked:true} ];
    this.OPTIONS2 = [{id: 0 , name : "Leandro",checked:true },{ id : 1 , name : "Chico", checked:true },  {id : 2 , name : "Bruno" , checked:true} ];
    this.rows = [
        this.createData('Kitchen', this.OPTIONS),
        this.createData('Living Room', this.OPTIONS2),
        this.createData('Bedroom1', this.OPTIONS,),
        this.createData('Bedroom2', this.OPTIONS2),
    ];
    this.state = { checked: false, title: "Edit Current Divisions' Permissions", OPTIONS : this.OPTIONS };
    
}
    createData(name, people, fat, carbs, protein) {
    return { name, people, fat, carbs, protein };
  }
  /*
  handleChange() {

    this.setState({
      checked: !this.state.checked
    })
  }
*/

  
render (){

return  (
  <Card small className="mb-4">
    <CardHeader className="border-bottom">
      <h6 className="m-0">{this.state.title}</h6>
    </CardHeader>
    <ListGroup flush>
    <TableContainer component={Paper}>
      <Table   aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Name of Division</StyledTableCell>
            <StyledTableCell>People</StyledTableCell>
            <StyledTableCell >Number of Members&nbsp;</StyledTableCell>
            <StyledTableCell>Edit Division&nbsp;</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {this.rows.map((row) => (
            <StyledTableRow key={row.name}>
              <StyledTableCell component="th" scope="col">
                {row.name}
              </StyledTableCell>
              <StyledTableCell component="th" scope="col" > 
                <ul>
                    {
                    row.people.map((person) => {
                        return (
                        <li key={person.name}>
                            { person.name }
                        </li>
                        );
                    })
                    }
                </ul>
      </StyledTableCell>
                <StyledTableCell component="th"  scope="col" >{row.people.length}</StyledTableCell>
              <StyledTableCell component="th" scope="col"><Button type="button" >Edit</Button></StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </ListGroup>
  </Card>
);
}

}

export default EditDivision;
