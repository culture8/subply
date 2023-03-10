import React, { useState, useEffect } from "react";
import styled from "styled-components/native";
import { useDispatch, useSelector } from "react-redux";
import CheckBox from "@react-native-community/checkbox";

import { RootState } from "~/stores/store";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import colors from "~/styles/colors";
import { SCREENWIDTH } from "~/constants/constants";
import { BASE_URL } from "~/query/urls";
import { addProductToMenu, deleteProduct } from "~/stores/slices/cartSlice";

import {
  BtnCTA,
  BtnText,
  Col,
  Container,
  HorizontalLine,
  HorizontalSpace,
  Row,
  TextMain,
  TextSub,
} from "~/styles/styledConsts";

const Thumbnail = styled.Image`
  width: 100px;
  height: 100px;
  /* background-color: ${colors.highlight}; */
`;
const ProductInfoContainer = styled.View`
  flex: 1;
  height: 120px;
  margin-left: 16px;
  margin-top: 15px;
  justify-content: space-between;
  /* background-color: ${colors.highlight}; */
`;
const NutrSummaryContainer = styled.View`
  flex-direction: row;
  width: 110%;
  height: 22px;
  border-radius: 5px;
  margin-top: 5px;
  justify-content: space-between;
  background-color: ${colors.white};
`;
const MainText = styled(TextSub)`
  margin-top: 20px;
  font-size: 14px;
`;
const AutoText = styled(TextSub)`
  font-size: 14px;
  padding: 35px;
`;
const AddButtonImage = styled.Image`
  width: 30px;
  height: 30px;
  margin-left: 60px;
  left: 25px;
`;

const AutoButton = styled.TouchableOpacity`
  margin-top: 10px;
  border-width: 1px;
  border-color: ${colors.main};
  border-radius: 3px;
`;

import Modal from "react-native-modal";
import { Slider } from "~/components/home/homeFilter/slider/Slider";
import { SliderContainer } from "~/components/home/homeFilter/slider/SliderContainer";

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: "white",
  },
  button: {
    right: 10,
    position: "absolute",
    backgroundColor: "#590DE1",
    width: 25,
    height: 25,
    marginTop: 20,
    borderRadius: 35,

    ...Platform.select({
      ios: {
        shadowColor: "rgba(0,0,0,0.2)",
        shadowOpacity: 1,
        shadowOffset: { height: 2, width: 2 },
        shadowRadius: 2,
      },

      android: {
        elevation: 0,
      },
    }),
  },

  text: {
    fontSize: 18,
    textAlign: "center",
    color: "white",
  },
  textInput: {
    borderColor: "black",
    borderWidth: 1,
  },
  container: {
    position: "absolute",

    backgroundColor: "white",
  },
});
const aboveThumbStyles = StyleSheet.create({
  gramContainer: {
    alignItems: "center",
    height: 20,
    justifyContent: "center",
    marginLeft: 2,
  },
  kcalContainer: {
    alignItems: "center",
    height: 20,
    justifyContent: "center",
  },
});
const customTrackStyle = StyleSheet.create({
  track: {
    borderColor: "#E5E5E5",
    borderWidth: 1,
  },
  trackOn: {
    borderColor: "#590DE1",
    borderWidth: 1,
  },
});
const renderBelowKcal = (value: number, index: number) => {
  return (
    <View style={aboveThumbStyles.kcalContainer}>
      <Text>{index}???</Text>
    </View>
  );
};
//??????????????? ????????? ????????? Constainer
const StyledSafeAreaView = styled.SafeAreaView`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const StyledModalContainer = styled.View`
  flex-direction: column;
  align-items: center;
  /* ????????? ?????? ?????? */
  width: 320px;
  height: 400px;
  background-color: rgba(255, 255, 255, 1);
  border-radius: 10px;
`;

const StyledModalButton = styled.TouchableOpacity`
  /* Modal Button?????? ????????? ?????? ????????? ???????????? ?????? ????????? flex??? ??? */
  flex: 1;
  width: 320px;
  justify-content: center;
`;

// ????????? ????????? ???????????? ???????????? ?????? ????????? ????????? View ??????
const StyledModalGradeWrapper = styled.View`
  flex: 1;
  width: 320px;
  justify-content: center;
`;

const StyledModalGradeText = styled.Text`
  align-self: center;
  font-size: 15px;
`;

const StyledModalText = styled.Text`
  align-self: center;
  color: black;
  font-size: 15px;
  margin: 10px;
`;

const HorizentalLine = styled.View`
  margin-top: 20px;
  background-color: grey;
  height: 1px;
  align-self: stretch;
`;

const StyledModalOpenButton = styled.TouchableOpacity`
  height: 50px;
  width: 60%;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  border-width: 1px;
  border-color: rgba(0, 0, 0, 1);
`;

const StyledModalOutputText = styled.Text`
  color: black;
  font-size: 30px;
`;
const RowContainer = styled.View`
  flex-direction: row;
`;

const Space = styled.View`
  width: 300px;
`;
const EachCheckBoxAndroid = () => {
  const [state, setState] = useState(false);
  // const checked = useSelector((state: RootState) => {
  //   return state.checkBox.check;
  // });
  const cartCheckAll = () => {
    setState(!state);
  };
  // useEffect(() => {
  //   cartCheckAll();
  // }, [checked]);
  return (
    <View style={styles.container}>
      <CheckBox
        value={state}
        onValueChange={(value) => setState(value)}
        tintColors={{ true: "#30D158" }}
      />
    </View>
  );
};
const start = () => {
  console.log("??????");
};
const end = () => {
  console.log("end");
};
const change = () => {
  console.log("change");
};
const AutoDiet = (props: any): React.ReactElement => {
  //State??? ???????????? Modal??? ?????????
  //Output??? State??? ????????? ????????? ??????????????? ?????? ????????? ??????
  const [modalOutput, setModalOutput] = useState<string>("Open Modal");
  const { modalVisible, setModalVisible } = props;
  return (
    <>
      {/* Modal??? StyledModalOpenButton??? ????????? ???????????? ?????????. Container?????? ???????????? ????????? ??? */}
      <Modal
        //isVisible Props??? State ?????? ???????????? On/off control
        isVisible={modalVisible}
        //??????????????? ????????? ????????? ???????????? ????????????, useNativeDriver Props??? True??? ?????? ???????????????.
        useNativeDriver={true}
        hideModalContentWhileAnimating={true}
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      >
        <StyledModalContainer>
          <StyledModalGradeWrapper>
            <StyledModalGradeText>
              ???????????? ?????? ?????? 3?????? ?????? ??????????????????
            </StyledModalGradeText>
          </StyledModalGradeWrapper>
          <RowContainer>
            <StyledModalButton
              onPress={() => {
                setModalOutput("?????? 1");
              }}
            >
              <EachCheckBoxAndroid />
              <StyledModalText>?????????</StyledModalText>
            </StyledModalButton>

            <StyledModalButton
              onPress={() => {
                setModalOutput("?????? 2");
              }}
            >
              <EachCheckBoxAndroid />

              <StyledModalText>????????????</StyledModalText>
            </StyledModalButton>

            <StyledModalButton
              onPress={() => {
                setModalOutput("?????? 3");
              }}
            >
              <EachCheckBoxAndroid />

              <StyledModalText>?????????</StyledModalText>
            </StyledModalButton>
          </RowContainer>
          <RowContainer>
            <StyledModalButton
              onPress={() => {
                setModalOutput("?????? 4");
              }}
            >
              <EachCheckBoxAndroid />

              <StyledModalText>????????????</StyledModalText>
            </StyledModalButton>
            <StyledModalButton
              onPress={() => {
                setModalOutput("?????? 5");
              }}
            >
              <EachCheckBoxAndroid />

              <StyledModalText>??????</StyledModalText>
            </StyledModalButton>
            <StyledModalButton
              onPress={() => {
                setModalOutput("?????? 6");
              }}
            >
              <EachCheckBoxAndroid />

              <StyledModalText>??????</StyledModalText>
            </StyledModalButton>
          </RowContainer>
          <HorizentalLine />
          <Space>
            <SliderContainer caption="??? ??? ??????" sliderValue={[4000, 14000]}>
              <Slider
                animateTransitions
                maximumValue={14000}
                minimumTrackTintColor="#590DE1"
                minimumValue={4000}
                step={1000}
                thumbTintColor="white"
                renderBelowThumbComponent={renderBelowKcal}
                // renderAboveThumbComponent={renderAboveKcal}
                trackStyle={customTrackStyle.track}
                onSlidingStart={start}
                onSlidingComplete={end}
                onValueChange={change}
              />
            </SliderContainer>
          </Space>
          <StyledModalButton
            onPress={() => {
              setModalVisible(false);
            }}
          >
            <Text style={{ alignSelf: "center" }}>??????</Text>
          </StyledModalButton>
        </StyledModalContainer>
      </Modal>
    </>
  );
};

const EmptyCart = () => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  //data??? ???????????? ??????
  return (
    <>
      <MainText>????????? ??????????????????</MainText>
      <AutoButton>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Row>
            <AutoDiet
              modalVisible={modalVisible}
              setModalVisible={setModalVisible}
            />
            <AddButtonImage
              source={require(`~/assets/icons/24_autoMenu_activated.png`)}
            />
            <AutoText>???????????? ????????????</AutoText>
          </Row>
        </TouchableOpacity>
      </AutoButton>
    </>
  );
};

export default EmptyCart;
