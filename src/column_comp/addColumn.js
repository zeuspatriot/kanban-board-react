import React,{ Component } from 'react';

class AddColumn extends Component {
    constructor(props){
        super(props);
        this.addColumn = this.addColumn.bind(this);
    }
    addColumn(e){
        e.preventDefault();
        console.log(e.target.newColumn.value);
        this.props.addColumn(e.target.newColumn.value);
    }

    render(){
        return (
            <div className="column">
                <h2>Add new Column</h2>
                <form onSubmit={this.addColumn}>
                    <input id="newColumn" name="newColumn" />
                    <button name="newCol" type="submit">+</button>
                </form>
            </div>
        )
    }
}

export default AddColumn;
