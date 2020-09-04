/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Text,
  StatusBar,
  TouchableOpacity,
  Dimensions,
  View,
  Image,
  Alert,
} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import {QRreader} from 'react-native-qr-decode-image-camera';

const App: () => React$Node = () => {
  const [image, setImage] = useState(null);
  const [result, setResult] = useState(null);

  const handleOnPress = () => {
    try {
      ImagePicker.launchImageLibrary(
        {
          storageOptions: {
            path: 'images',
          },
          title: '사진을 선택하세요',
        },
        response => {
          if (response.didCancel) {
            console.log('취소함');
          } else if (response.error) {
            console.log('에러 : ', response.error);
          } else {
            const source = {uri: response.uri};

            setImage(source);
          }
        },
      );
    } catch (e) {
      console.log(e);
    }
  };

  const decodeImage = async () => {
    try {
      QRreader(image.uri)
        .then(data => {
          setResult(data);
        })
        .catch(e => {
          console.log({e});
          setResult(null);

          return Alert.alert('알림', '스캔을 실패하였습니다.');
        });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={[styles.fill, styles.bgWhite]}>
        <ScrollView contentContainerStyle={styles.fill}>
          <View style={[styles.fill, styles.spaceAround, styles.row]}>
            <TouchableOpacity style={styles.button} onPress={handleOnPress}>
              <Text style={styles.text}>{'사진첩 >'}</Text>
            </TouchableOpacity>
            {image && (
              <TouchableOpacity style={styles.button} onPress={decodeImage}>
                <Text style={styles.text}>스캔</Text>
              </TouchableOpacity>
            )}
          </View>
          <View style={[styles.fill, styles.center]}>
            {image && (
              <>
                <Image
                  source={{uri: image.uri}}
                  style={{
                    width: '100%',
                    height: '100%',
                  }}
                  resizeMode="contain"
                />
              </>
            )}
          </View>
          <View style={[styles.fill, styles.center]}>
            {image && <Text style={styles.text}>{result}</Text>}
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
  },
  spaceAround: {
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  fill: {
    flex: 1,
  },
  bgWhite: {
    backgroundColor: 'white',
  },
  button: {
    borderWidth: 1,
    borderColor: 'blue',
    borderRadius: 10,
    width: Dimensions.get('screen').width / 3,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'blue',
    fontSize: 20,
  },
  resultBox: {
    borderWidth: 1,
    borderColor: 'blue',
    borderRadius: 10,
    width: Dimensions.get('screen').width / 1.2,
    marginLeft: 'auto',
    marginRight: 'auto',
    padding: 10,
  },
});

export default App;
