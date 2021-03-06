/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {Component} from 'react';
import {NavigationContainer, StackRouter} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
} from '@react-navigation/drawer';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

import SplashScreen from 'react-native-splash-screen';

import Login from './screens/Account/Login';
import Signup from './screens/Account/Signup';
import Profile from './screens/Account/Profile';
import Update from './screens/Account/Update';
import StartSex from './screens/Account/StartSex';
import StartInfo from './screens/Account/StartInfo';

import Gallery from './screens/Record/Gallery/Gallery';
import Record from './screens/Record/Record/Record';
import Calendar from './screens/Record/Calendar/Calendar';
import DetailImage from './screens/Record/Gallery/DetailImage';
import MyDatePicker from './screens/Record/Gallery/DatePicker';

import BestArticle from './screens/Rank/BestArticle';
import BestUser from './screens/Rank/BestUser';

import Community from './screens/Community/Community';
import Comment from './screens/Community/Comment';
import CreateSelect from './screens/Community/CreateSelect';
import CreateArticle from './screens/Community/CreateArticle';
import MyFeed from './screens/Community/MyFeed';
import MyFeedDetail from './screens/Community/MyFeedDetail';
import UserFeed from './screens/Community/UserFeed';

import Analysis from './screens/Analysis/Analysis';

// component
import CustomDrawerContent from './components/CustomDrawerContent';

import Icon from 'react-native-vector-icons/Ionicons';
import {Provider} from 'react-redux';
import {store} from './src/store/index';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();
const TopTab = createMaterialTopTabNavigator();
const tapOptions = {
  activeTintColor: '#f39c12',
  inactiveTintColor: '#bebebe',
  style: {
    backgroundColor: '#fbfbe6',
  },
  indicatorStyle: {
    borderBottomColor: '#f39c12',
    borderBottomWidth: 3,
  },
  labelStyle: {
    fontSize: 20,
    fontFamily: 'NanumSquareRoundEB',
  },
};

// Stack
function CommunityStack() {
  return (
    <Stack.Navigator
      initialRouteName="Community"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen
        name="Community"
        component={Community}
        options={{title: '????????????'}}
      />
      <Stack.Screen
        name="MyFeedDetail"
        component={MyFeedDetail}
        options={{title: '??? ?????? ????????? ??????'}}
      />
      <Stack.Screen
        name="UserFeed"
        component={UserFeed}
        options={{title: '?????? ??????'}}
      />
      <Stack.Screen
        name="Comment"
        component={Comment}
        options={{title: '??????'}}
      />
      <Stack.Screen
        name="CreateSelect"
        component={CreateSelect}
        options={{title: '????????????'}}
      />
      <Stack.Screen
        name="CreateArticle"
        component={CreateArticle}
        options={{title: '???????????????'}}
      />
    </Stack.Navigator>
  );
}

function RecordStack() {
  return (
    <Stack.Navigator
      initialRouteName="Record"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen
        name="Record"
        component={RecordTaps}
        options={{title: '??? ??????'}}
      />
      <Stack.Screen
        name="DetailImage"
        component={DetailImage}
        options={{title: '?????? ?????????'}}
      />
      <Stack.Screen
        name="MyDatePicker"
        component={MyDatePicker}
        options={{title: '?????? ??????'}}
      />
    </Stack.Navigator>
  );
}

function RankStack() {
  return (
    <Stack.Navigator
      initialRouteName="RankTabs"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen
        name="RankTabs"
        component={RankTabs}
        option={{title: '?????? ??????'}}
      />
      <Stack.Screen
        name="Comment"
        component={Comment}
        options={{title: '??????'}}
      />
      <Stack.Screen
        name="UserFeed"
        component={UserFeed}
        options={{title: '?????? ??????'}}
      />
    </Stack.Navigator>
  );
}

function AcccountStack() {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen
        name="Login"
        component={Login}
        options={{title: '?????????'}}
      />
      <Stack.Screen
        name="Signup"
        component={Signup}
        options={{title: '????????????'}}
      />
      <Stack.Screen
        name="Startsex"
        component={StartSex}
        options={{title: '????????????'}}
      />
      <Stack.Screen
        name="Startinfo"
        component={StartInfo}
        options={{title: '????????????'}}
      />
    </Stack.Navigator>
  );
}

function ProfileScreen() {
  return (
    <Stack.Navigator
      initialRouteName="Profile"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{title: '?????????'}}
      />
      <Stack.Screen
        name="Update"
        component={Update}
        options={{title: '???????????????'}}
      />
    </Stack.Navigator>
  );
}

function AnalysisScreen() {
  return (
    <Stack.Navigator
      initialRouteName="Analysis"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen
        name="Analysis"
        component={Analysis}
        options={{title: '??? ??????'}}
      />
    </Stack.Navigator>
  );
}

// Tab
function TapNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="??????"
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;

          if (route.name === '????????????') {
            iconName = focused ? 'earth' : 'earth-outline';
          } else if (route.name === '??????') {
            iconName = focused ? 'calendar' : 'calendar-outline';
          } else if (route.name === '??????') {
            iconName = focused ? 'medal' : 'medal-outline';
          } else {
            iconName = focused ? 'analytics' : 'analytics-outline';
          }

          // You can return any component that you like here!
          return <Icon name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: '#fff',
        inactiveTintColor: '#fad499',
        style: {
          backgroundColor: '#f39c12',
          paddingVertical: 5,
        },
        labelStyle: {
          fontSize: 15,
        },
      }}>
      <Tab.Screen name="??????" component={RecordStack} />
      <Tab.Screen name="????????????" component={CommunityStack} />
      <Tab.Screen name="??????" component={RankStack} />
      <Tab.Screen name="??????" component={AnalysisScreen} />
    </Tab.Navigator>
  );
}

function RankTabs() {
  return (
    <TopTab.Navigator
      initialRouteName="BestArticle"
      tabBarPosition="top"
      tabBarOptions={tapOptions}>
      <TopTab.Screen name="??????" component={BestArticle} />
      <TopTab.Screen name="?????????" component={BestUser} />
    </TopTab.Navigator>
  );
}

function FeedScreen() {
  return (
    <Stack.Navigator
      initialRouteName="MyFeed"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen
        name="MyFeed"
        component={MyFeed}
        options={{title: '??? ??????'}}
      />
      <Stack.Screen
        name="MyFeedDetail"
        component={MyFeedDetail}
        options={{title: '??? ?????? ?????????'}}
      />
    </Stack.Navigator>
  );
}

function RecordTaps() {
  return (
    <TopTab.Navigator
      initialRouteName="BestArticle"
      tabBarPosition="top"
      tabBarOptions={tapOptions}>
      <TopTab.Screen name="??????" component={Gallery} />
      <TopTab.Screen name="??????" component={Record} />
      <TopTab.Screen name="??????" component={Calendar} />
    </TopTab.Navigator>
  );
}

// Drawer
// function DrawerStack(props) {
class DrawerStack extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <>
        <Drawer.Navigator
          initialRouteName="??????"
          drawerPosition="right"
          drawerContent={() => (
            <CustomDrawerContent navigation={this.props.navigation} />
          )}
          screenOptions={{
            headerShown: false,
          }}
          // drawerIcon={{foucsed: true, color: 'red', size: 20}}
          hideStatusBar={true}
          statusBarAnimation={true}>
          <Drawer.Screen name="??????" component={TapNavigator} />
          <Drawer.Screen name="??? ??????" component={ProfileScreen} />
          <Drawer.Screen name="??? ??????" component={FeedScreen} />
          {/* <Drawer.Screen name="?????????" component={CustomDrawerContent} /> */}
        </Drawer.Navigator>
      </>
    );
  }
}

const stackApp = createStackNavigator();
// export default function App() {
export default class App extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    SplashScreen.hide();
  }
  render() {
    return (
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="?????????"
            screenOptions={{
              headerShown: false,
            }}>
            <stackApp.Screen name="?????????" component={AcccountStack} />
            <stackApp.Screen name="drawer" component={DrawerStack} />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    );
  }
}
