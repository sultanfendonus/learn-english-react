import React, {Component} from 'react';
import {connect} from 'react-redux';
import {newFeedback} from "../../actions/index"
import {Card} from 'antd';
import {Input, message} from 'antd';
import {Select, Button} from 'antd';

const {Option} = Select;
const {TextArea} = Input;
let self;

function mapStateToProps(state) {
    return {};
}

class NewFeedbackContainer extends Component {
    state = {category: null, name: null, message: null}

    componentDidMount() {
        self = this;
    }

    onChange(value) {
        console.log(`selected ${value}`);
        self.setState({category: value})
    }

    submitForm() {
        if (this.state.message) {
            this.props.newFeedback({
                user_name: this.state.name,
                category: this.state.category,
                message: this.state.message
            })
            this.setState({category: null, name: null, message: null})
        } else {
            message.error("Please write some feedback.")
        }
    }

    render() {
        return (
            <div>
                <Card title="New Feedback" style={{}}>
                    <p style={{fontWeight: 'bolder'}}>Name:</p>
                    <Input
                        value={this.state.name} onChange={(e) => this.setState({name: e.target.value})}
                        style={{marginBottom: '10px', fontSize: 18}} placeholder="Name"/>

                    <p style={{fontWeight: 'bolder'}}>Category:</p>
                    <Select
                        showSearch
                        style={{width: 300, marginBottom: '10px'}}
                        placeholder="Select a feedback category"
                        optionFilterProp="children"
                        onChange={this.onChange}
                        filterOption={(input, option) =>
                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                    >
                        <Option value="improvement">Improvement</Option>
                        <Option value="new-Feature">New Feature</Option>
                        <Option value="bug">Bug</Option>
                    </Select>

                    <p style={{fontWeight: 'bolder'}}>Your feedback/message:</p>
                    <TextArea value={this.state.message} style={{marginBottom: '15px'}}
                              onChange={(e) => this.setState({message: e.target.value})} rows={8}/>

                    <Button onClick={() => this.submitForm()} type="primary">Submit</Button>

                </Card>

            </div>
        );
    }
}

export default connect(
    mapStateToProps, {newFeedback}
)(NewFeedbackContainer);