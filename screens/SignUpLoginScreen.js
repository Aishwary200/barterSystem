import React, { Component } from 'react';
import {
    Alert,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    Modal,
    ScrollView,
    KeyboardAvoidingView,
} from 'react-native';
import db from '../config';
import firebase from 'firebase';

export default class SignUpLoginScreen extends Component {
    constructor() {
        super();
        this.state = {
            isModalVisible: false,
            emailId: '',
            password: '',
            firstName: '',
            lastName: '',
            contact: '',
            address: '',
            confirmPassword: '',
            currencyCode: '',
        };
    }
    userSignUp = (emailId, password, confirmPassword) => {
        if (password !== confirmPassword) {
            return Alert.alert("password doesn't match Check your password.");
        } else {
            firebase
                .auth()
                .createUserWithEmailAndPassword(emailId, password)
                .then((response) => {
                    db.collection('users').add({
                        first_name: this.state.firstName,
                        last_name: this.state.lastName,
                        mobile_number: this.state.contact,
                        emailId: this.state.emailId,
                        address: this.state.address,
                    });
                    return Alert.alert('User Added Successfully', '', [
                        {
                            text: 'OK',
                            onPress: () => {
                                this.setState({
                                    isModalVisible: false,
                                });
                            },
                        },
                    ]);
                })
                .catch(function (error) {
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    return Alert.alert(errorMessage);
                });
        }
    };
    userLogin = (emailId, password) => {
        firebase
            .auth()
            .signInWithEmailAndPassword(emailId, password)
            .then((response) => {
                return Alert.alert('successfully Login');
            })
            .catch(function (error) {
                var errorCode = error.code;
                var errorMessage = error.message;
                return Alert.alert(errorMessage);
            });
    };
    showModal = () => (
        <Modal
            animationType="fade"
            transparent={true}
            visible={this.state.isModalVisible}>
            <View style={styles.modalContainer}>
                <ScrollView style={{ width: '100%' }}>
                    <KeyboardAvoidingView style={styles.keyboardAvoidingView}>
                        <Text
                            style={{
                                justifyContent: 'center',
                                alignSelf: 'center',
                                fontSize: 30,
                                color: '#ff5722',
                                margin: 50,
                            }}>
                            Registration
            </Text>
                        <TextInput
                            style={styles.formTextInput}
                            placeholder={'First Name'}
                            maxLength={8}
                            onChangeText={(text) => {
                                this.setState({
                                    firstName: text,
                                });
                            }}
                        />
                        <TextInput
                            style={styles.formTextInput}
                            placeholder={'Last Name'}
                            maxLength={8}
                            onChangeText={(text) => {
                                this.setState({
                                    lastName: text,
                                });
                            }}
                        />
                        <TextInput
                            style={styles.formTextInput}
                            placeholder={'Mobile Number'}
                            maxLength={10}
                            keyboardType={'numeric'}
                            onChangeText={(text) => {
                                this.setState({
                                    mobileNumber: text,
                                });
                            }}
                        />
                        <TextInput
                            style={styles.formTextInput}
                            placeholder={'Address'}
                            multiline={true}
                            onChangeText={(text) => {
                                this.setState({
                                    address: text,
                                });
                            }}
                        />
                        <TextInput
                            style={styles.formTextInput}
                            placeholder={'Username'}
                            keyboardType={'email-address'}
                            onChangeText={(text) => {
                                this.setState({
                                    username: text,
                                });
                            }}
                        />
                        <TextInput
                            style={styles.formTextInput}
                            placeholder={'Password'}
                            secureTextEntry={true}
                            onChangeText={(text) => {
                                this.setState({
                                    password: text,
                                });
                            }}
                        />
                        <TextInput
                            style={styles.formTextInput}
                            placeholder={'Confrim Password'}
                            secureTextEntry={true}
                            onChangeText={(text) => {
                                this.setState({
                                    confirmPassword: text,
                                });
                            }}
                        />
                        <View style={styles.modalBackButton}>
                            <TouchableOpacity
                                style={styles.registerButton}
                                onPress={() =>
                                    this.userSignUp(
                                        this.state.username,
                                        this.state.password,
                                        this.state.confirmPassword
                                    )
                                }>
                                <Text style={styles.registerButtonText}>Register</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.modalBackButton}>
                            <TouchableOpacity
                                style={styles.cancelButton}
                                onPress={() => this.setState({ isModalVisible: false })}>
                                <Text style={{ color: '#ff5722' }}>Cancel</Text>
                            </TouchableOpacity>
                        </View>
                    </KeyboardAvoidingView>
                </ScrollView>
            </View>
        </Modal>
    );
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.buttonContainer}>{this.showModal()}</View>

                <View style={styles.profileContainer}>
                    <Text style={styles.title}>Barter System</Text>
                </View>
                <View>
                    <TextInput
                        style={styles.formTextInput}
                        placeholder="abc@example.com"
                        keyboardType="email-address"
                        onChangeText={(text) => {
                            this.setState({
                                emailId: text,
                            });
                        }}
                    />
                    <TextInput
                        style={styles.formTextInput}
                        placeholder="Enter password"
                        secureTextEntry={true}
                        onChangeText={(text) => {
                            this.setState({
                                password: text,
                            });
                        }}
                    />
                    <TextInput
                        style={styles.formTextInput}
                        placeholder={'Country currency code'}
                        maxLength={8}
                        onChangeText={(text) => {
                            this.setState({
                                currencyCode: text,
                            });
                        }}
                    />
                    <TouchableOpacity
                        style={[styles.button, { marginBottom: 20, marginTop: 20 }]}
                        onPress={() => {
                            this.userLogin(this.state.emailId, this.state.password);
                        }}>
                        <Text style={styles.buttonText}>Login</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => {
                            this.setState({ isModalVisible: true });
                        }}>
                        <Text style={styles.buttonText}>Sign up</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8BE85',
    },
    profileContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 65,
        fontWeight: '300',
        paddingBottom: 30,
        color: '#ff3d00',
    },
    button: {
        width: 300,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 25,
        backgroundColor: '#ff9800',
        shadowColor: '#000',
        marginLeft: 25,
        shadowOffset: {
            width: 0,
            height: 8,
        },
        shadowOpacity: 0.3,
        shadowRadius: 10.32,
        elevation: 16,
    },
    buttonText: {
        color: '#ffff',
        fontWeight: '200',
        fontSize: 20,
    },
    buttonContainer: {
        flex: 1,
        alignItems: 'center',
    },
    keyboardAvoidingView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        flex: 1,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffff',
        marginRight: 30,
        marginLeft: 30,
        marginTop: 80,
        marginBottom: 80,
    },
    formTextInput: {
        width: '75%',
        height: 35,
        alignSelf: 'center',
        borderColor: 'black',
        borderRadius: 10,
        borderWidth: 1,
        marginTop: 20,
        padding: 10,
    },
    registerButton: {
        width: 200,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderRadius: 10,
        marginTop: 30,
    },
    registerButtonText: {
        color: '#ff5722',
        fontSize: 15,
        fontWeight: 'bold',
    },
    cancelButton: {
        width: 200,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 5,
    },
});
