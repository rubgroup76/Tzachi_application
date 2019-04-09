import React from 'react';
import { Text, View, Image } from 'react-native';
import styles from './pageStyle';
import { Button, Avatar, Badge, withBadge, colors } from 'react-native-elements';
//import Icon from 'react-native-vector-icons/FontAwesome';
 

export default class ElementsPage extends React.Component {
    static navigationOptions = {
        title: 'Elements PAGE',
    };

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.Header}>
                    <Text style={styles.textBig}>Elements Page</Text>
                    <Image 
                        style={{ alignSelf: 'center', width: 100, height: 100 }}
                        source={require('../assets/icon.png')} />
                    <View style={{ margin: 10, justifyContent: 'flex-start' }}>

                    </View>
                </View>
                <View style={styles.Content}>
                    <Button
                        type='outline'
                        title="Go To Home Page"
                        containerStyle={{ margin: 10 }}
                        onPress={() => this.props.navigation.navigate('Home')}
                    />
                    <Button
                        buttonStyle={{ backgroundColor: colors.secondary }}
                        containerStyle={{ margin: 10 }}
                        icon={
                            <Icon
                                name="arrow-right"
                                size={15}
                                color="white"
                            />
                        }
                        iconRight
                        title="Button with icon component"
                        onPress={() => { alert(1) }}
                    />
                    <Button
                        title="Loading button"
                        loading={true}
                    />
                    <Button
                        buttonStyle={{ backgroundColor: colors.warning }}
                        title="Loading Button"
                        containerStyle={{ margin: 10 }}
                    />

                    <Badge value="99+" status="error" badgeStyle={{ margin: 10 }} />
                    <Badge value={<Text>My Custom Badge</Text>} />


                    {/* <Badge status="success" />
        <Badge status="error" />
        <Badge status="primary" />
        <Badge status="warning" /> */}

                    <View style={{ margin: 20 }}>
                        <Avatar
                            rounded
                            source={{
                                uri: 'https://randomuser.me/api/portraits/men/41.jpg',
                            }}
                            size="xlarge"
                        />
                        <Badge
                            status="success"
                            containerStyle={{ position: 'absolute', top: -4, right: -4 }}
                            value={<Text style={{ color: 'white', fontSize: 25 }}>30</Text>}
                            badgeStyle={{ width: 50, height: 50, borderRadius: 50 }}
                            size='xlarge'
                        />
                    </View>
                </View>
            </View >
        );
    }
}