// main app

import React, {Component} from 'react';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import Menu from './menu.jsx';
import ContactList from './contact-list.jsx';
import ContactDetail from './contact-detail.jsx';
import Groups from './groups.jsx';



class App extends Component {

    constructor(props){

        super(props);

        this.state = {
            contacts: [
                {
                    id: 1,
                    name: 'shiva',
                    group: 'Friend',
                    mobile: '9874561230'            
                },
                {
                    id: 2,
                    name: 'rudra',
                    group: 'Friend',
                    mobile: '7894561233'            
                },
            ],
            groups: [
                {
                    id: 1,
                    name: 'Friends'            
                },
                {
                    id: 2,
                    name: 'Work'            
                }
            ]
        };

        this.addContact = this.addContact.bind(this);
        this.delContact = this.delContact.bind(this);
        this.editContact = this.editContact.bind(this);

        this.addGroup = this.addGroup.bind(this);
        this.delGroup = this.delGroup.bind(this);

    }

    addContact(contact) {

        const contacts = this.state.contacts;
        const id = Math.max.apply(Math, contacts.map( function(c){return c.id;}) ) + 1;
        contact.id = id;
        contacts.push(contact);
        this.setState({ contacts: contacts });       

    }

    delContact(id) {

        this.setState({contacts: this.state.contacts.filter((item) => item.id != id)});     

    }

    editContact(contact) {

        this.setState({contacts: this.state.contacts.map(
            (el) => el.id === contact.id ? Object.assign({}, el, {name: contact.name, group: contact.group, mobile: contact.mobile}) : el 
        )});

    }

    addGroup(group) {

        const groups = this.state.groups;
        const id = Math.max.apply(Math, groups.map( function(c){return c.id;}) ) + 1;
        groups.push({id: id, name: group});
        this.setState({ groups: groups });       

    }

    delGroup(id) {

        this.setState({groups: this.state.groups.filter((item) => item.id != id)});     

    }

    render(){

        return(

            <Router basename={'/'}>
                <div className="wrapper">
                    <Menu />
                    
                    <Switch>
                        <Route 
                            exact 
                            path="/" 
                            render={()=>
                                <ContactList 
                                    contacts={this.state.contacts} 
                                    groups={this.state.groups} 
                                    addContact={this.addContact} 
                                    delContact={this.delContact}
                                />
                            }
                        />
                        <Route 
                            path="/groups" 
                            render={()=>
                                <Groups 
                                    groups={this.state.groups} 
                                    addGroup={this.addGroup} 
                                    delGroup={this.delGroup}
                                />
                            }
                        />
                        <Route 
                            path="/contact/:id" 
                            render={()=>
                                <ContactDetail 
                                    contacts={this.state.contacts}
                                    groups={this.state.groups} 
                                    editContact={this.editContact}
                                />
                            }
                        />
                        <Route 
                            path='*'
                            render={()=>
                                <ContactList 
                                    contacts={this.state.contacts} 
                                    groups={this.state.groups} 
                                    addContact={this.addContact} 
                                    delContact={this.delContact}
                                />
                            }
                        />
                    </Switch>
                </div>
            </Router>

        );

    }
}

export default App