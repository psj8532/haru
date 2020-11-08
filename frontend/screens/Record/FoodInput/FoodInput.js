import React, {Component} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  TouchableOpacity,
  TouchableHighlight,
  AsyncStorage,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
// import ImagePicker from 'react-native-image-crop-picker';
import {serverUrl} from '../../../constants';

const H = Dimensions.get('window').height;
const W = Dimensions.get('window').width;

export default class FoodInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // foodInfo: this.props.existingInfo
    };
  }
  componentDidMount = async () => {
    const token = await AsyncStorage.getItem('auth-token');
    this.setState({
      token: token,
      showRecommend: false,
    });
  };
  recommend = (text) => {
    this.setState({
      foodInfo: {
        DESC_KOR: text,
      },
    });
    var data = new FormData();
    data.append('search', text);
    fetch(`${serverUrl}food/search/`, {
      method: 'POST',
      body: data,
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Token ${this.state.token}`,
      },
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.length > 0) {
          this.setState({
            showRecommend: true,
            recommendLst: response,
          });
          console.log(this.state.recommendLst);
        } else {
          this.setState({
            showRecommend: false,
            recommendLst: {},
          });
        }
      })
      .catch((error) => console.error(error));
  };
  chooseFood(idx) {
    var selectedFood = this.state.recommendLst[idx];
    if (!selectedFood['SERVING_SIZE']) {
      selectedFood['SERVING_SIZE'] = 0;
    }
    if (!selectedFood['NUTR_CONT1']) {
      selectedFood['NUTR_CONT1'] = 0;
    }
    if (!selectedFood['NUTR_CONT2']) {
      selectedFood['NUTR_CONT2'] = 0;
    }
    if (!selectedFood['NUTR_CONT3']) {
      selectedFood['NUTR_CONT3'] = 0;
    }
    if (!selectedFood['NUTR_CONT4']) {
      selectedFood['NUTR_CONT4'] = 0;
    }
    this.setState({
      showRecommend: false,
      foodInfo: selectedFood,
    });
  }
  saveFoodInfo() {
    this.props.saveFoodInfo(this.state.foodInfo);
  }
  close(tf) {
    this.props.close(tf);
  }
  // cropImg() {
  //   ImagePicker.openPicker({
  //     path: this.props.image.data,
  //     width: 300,
  //     height: 400,
  //   }).then(image => {
  //     console.log(image);
  //   });
  // }
  render() {
    return (
      <View>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text>영역선택</Text>
          {this.props.image !== null && (
            <TouchableOpacity onPress={this.cropImg}>
              <Image
                style={{height: 100, width: 100}}
                source={{
                  uri: `data:image/jpeg;base64,${this.props.image.data}`,
                }}
              />
            </TouchableOpacity>
          )}
          {this.props.image === null && (
            <View
              style={{
                height: 100,
                width: 100,
                backgroundColor: '#fff',
                borderRadius: 5,
                justifyContent: 'center',
                alignItems: 'center',
                padding: 20,
              }}>
              <Text style={{color: '#BEBEBE'}}>사진없음</Text>
            </View>
          )}
        </View>
        <View>
          <Text>음식이름</Text>
          <TextInput
            style={[
              styles.inputArea,
              {width: W * 0.7, backgroundColor: '#fff'},
            ]}
            placeholder="음식이름을 입력하세요."
            onChangeText={this.recommend}
            value={this.state.foodInfo ? this.state.foodInfo.DESC_KOR : ''}
          />
          <Text style={{color: '#BEBEBE', fontSize: 12, marginTop: 10}}>
            음식을 검색하면 영양정보가 자동으로 등록됩니다.
          </Text>
          {/* 여기에 추천 검색어가 뜨도록 */}
          {this.state.recommendLst && this.state.showRecommend && (
            <View
              style={{
                position: 'absolute',
                top: 70,
                width: W * 0.7,
                backgroundColor: '#fff',
                borderRadius: 5,
                zIndex: 2,
                padding: 10,
              }}>
              {this.state.recommendLst.map((food, i) => {
                return (
                  <TouchableOpacity onPress={() => this.chooseFood(i)}>
                    <Text style={{margin: 5}} key={i}>
                      {food['DESC_KOR']}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          )}
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
          <View style={{marginRight: 10}}>
            <Text style={styles.labeltxt}>칼로리</Text>
            <Text style={styles.labeltxt}>탄수화물</Text>
            <Text style={styles.labeltxt}>단백질</Text>
            <Text style={styles.labeltxt}>지방</Text>
          </View>
          <View>
            <View style={styles.inputline}>
              <TextInput
                style={[
                  styles.inputArea,
                  {width: W * 0.4, backgroundColor: '#EAEAEA'},
                ]}
                onChangeText={(text) =>
                  this.changeNum(text, this.state.foodInfo.NUTR_CONT1)
                }
                value={
                  this.state.foodInfo ? this.state.foodInfo.NUTR_CONT1 : ''
                }
                keyboardType="number-pad"
                placeholder="칼로리"
                editable={false}
              />
              <Text style={styles.labeltxt}>kcal</Text>
            </View>
            <View style={styles.inputline}>
              <TextInput
                style={[
                  styles.inputArea,
                  {width: W * 0.4, backgroundColor: '#EAEAEA'},
                ]}
                placeholder="탄수화물"
                value={
                  this.state.foodInfo ? this.state.foodInfo.NUTR_CONT2 : ''
                }
                keyboardType="number-pad"
                editable={false}
              />
              <Text style={styles.labeltxt}>g</Text>
            </View>
            <View style={styles.inputline}>
              <TextInput
                style={[
                  styles.inputArea,
                  {width: W * 0.4, backgroundColor: '#EAEAEA'},
                ]}
                placeholder="단백질"
                value={
                  this.state.foodInfo ? this.state.foodInfo.NUTR_CONT3 : ''
                }
                keyboardType="number-pad"
                editable={false}
              />
              <Text style={styles.labeltxt}>g</Text>
            </View>
            <View style={styles.inputline}>
              <TextInput
                style={[
                  styles.inputArea,
                  {width: W * 0.4, backgroundColor: '#EAEAEA'},
                ]}
                placeholder="지방"
                value={
                  this.state.foodInfo ? this.state.foodInfo.NUTR_CONT4 : ''
                }
                keyboardType="number-pad"
                editable={false}
              />
              <Text style={styles.labeltxt}>g</Text>
            </View>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            marginTop: 10,
            justifyContent: 'center',
          }}>
          <TouchableHighlight
            style={{...styles.FImodalButton, backgroundColor: '#FCA652'}}
            onPress={() => {
              this.saveFoodInfo();
            }}>
            <Text>저장</Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={{...styles.FImodalButton, backgroundColor: '#FCA652'}}
            onPress={() => {
              this.close(false);
            }}>
            <Text>취소</Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  inputline: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  inputArea: {
    // width: W * 0.7,
    height: W * 0.1,
    fontSize: W * 0.04,
    borderColor: 'lightgray',
    borderWidth: 1,
    borderRadius: 5,
    marginVertical: H * 0.01,
    marginRight: 5,
    padding: W * 0.02,
  },
  labeltxt: {
    marginVertical: H * 0.03,
    marginRight: 10,
  },
  FImodalButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 100,
    marginHorizontal: 20,
  },
});