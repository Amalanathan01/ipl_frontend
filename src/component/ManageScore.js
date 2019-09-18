import React, { Component } from 'react'
import { BootstrapTable, TableHeaderColumn }
    from 'react-bootstrap-table'
import overlayFactory from 'react-bootstrap-table2-overlay'


function onInsertRow(row) {
    let newRowStr = ''

    for (const prop in row) {
        newRowStr += prop + ': ' + row[prop] + ' \n'
    }
    alert('You inserted:\n ' + newRowStr)
}



function onDeleteRow(rowKeys) {
    alert('You deleted: ' + rowKeys)
}

class ManageScore extends Component {
    state = {
        data : []
    }

    handleBtnClick = () => {
        this.refs.table.handleAddRowAtBegin({
            id: '',
            season: '',
            city: '',
            date: '',
            team1: '',
            team2: '',
            toss_winner: '',
            toss_decision: '',
            result: '',
            dl_applied: '',
            winner: '',
            win_by_runs: '',
            win_by_wickets: '',
            player_of_match: '',
            venue: '',
            umpire1: '',
            umpire2: '',
            umpire3: ''
        });
    }

    render() {
        const options = {
            afterInsertRow: onInsertRow,
            afterDeleteRow: onDeleteRow
        }

        // To delete rows you be able to select rows
        const selectRowProp = {
            mode: 'checkbox'
        }

        const expandRow = {
            renderer: row => (
                <div>....</div>
            )
        };

        return (

            <div style={{ overflow:'auto' }}>
              <button onClick={this.handleBtnClick}>Prepend</button>
                <BootstrapTable
                    insertRow={true}
                    ref='table'
                    pagination
                    data={this.state.data}
                    deleteRow={true}
                    selectRow={selectRowProp}
                    options={options}
                >
                    <TableHeaderColumn width='150' isKey dataField='id'
                    >
                        ID
          </TableHeaderColumn>
                    <TableHeaderColumn width='150' dataField='season'
                    >
                        Season
          </TableHeaderColumn>
                    <TableHeaderColumn width='150' dataField='city'
                    >
                        City
          </TableHeaderColumn>
                    <TableHeaderColumn width='150' dataField='date'
                    >
                        Date
          </TableHeaderColumn>
                    <TableHeaderColumn width='150' dataField='team1'
                    >
                        Team1
          </TableHeaderColumn>
                    <TableHeaderColumn width='150' dataField='team2'
                    >
                        Team2
          </TableHeaderColumn>
                    <TableHeaderColumn width='150' dataField='toss_winner'
                    >
                        Toss Winner
          </TableHeaderColumn>
                    <TableHeaderColumn width='150' dataField='toss_decision'
                    >
                        Toss Decision
          </TableHeaderColumn>
                    <TableHeaderColumn width='150' dataField='result'
                    >
                        Result
          </TableHeaderColumn>
                    <TableHeaderColumn width='150' dataField='dl_applied'
                    >
                        DL Applied
          </TableHeaderColumn>
                    <TableHeaderColumn width='150' dataField='winner'
                    >
                        Winner
          </TableHeaderColumn>
                    <TableHeaderColumn width='150' dataField='win_by_runs'
                    >
                        Win By Runs
          </TableHeaderColumn>
                    <TableHeaderColumn width='150' dataField='palyer_of_match'
                    >
                        Player Of Match
          </TableHeaderColumn>
                    <TableHeaderColumn width='150' dataField='value'
                    >
                        City
          </TableHeaderColumn>
                    <TableHeaderColumn width='150' dataField='value'
                    >
                        City
          </TableHeaderColumn>
                    <TableHeaderColumn width='150' dataField='venue'
                    >
                        Venue
          </TableHeaderColumn>
                    <TableHeaderColumn width='150' dataField='umpire1'
                    >
                        Umpire1
          </TableHeaderColumn>
                    <TableHeaderColumn width='150' dataField='umpire2'
                    >
                        Umpire2
          </TableHeaderColumn>
                    <TableHeaderColumn width='150' dataField='umpire3'
                    >
                        Umpire3
          </TableHeaderColumn>
                    </BootstrapTable>
                
            </div>
        )
    }
}

export default ManageScore