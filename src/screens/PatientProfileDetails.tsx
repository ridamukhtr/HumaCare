import {ScrollView, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import CustomView from '../components/customComponents/CustomView';
import {useSelector} from 'react-redux';
import {selectedThemeSelector} from '../redux/themeReducer';
import useThemeManager from '../lib/customHooks/useThemeManger';
import {ArrowLeftIcon, CheckCircleIcon, LoadingIcon} from '../assets/svgIcons';
import {wp} from '../styles/theme-styles';
import CustomText from '../components/customComponents/CustomText';
import globalStyles from '../styles/globalStyles';
import {styles} from '../styles/patientScreenStyles';
import PatientCard from '../components/views/PatientCard';
import {
  NavigationProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {supabase} from '../config/supabaseClient';
import {FlatList} from 'react-native-gesture-handler';

const PatientProfileDetails = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const route = useRoute();
  const {patientId, patientDob, patientPhone} = route.params as {
    patientId: string;
    patientDob: string;
    patientPhone: string;
  };

  const theme = useSelector(selectedThemeSelector);
  const {colorTheme} = useThemeManager(theme);

  const [opsData, setOpsData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPatientData = async () => {
      if (!patientId) return;

      setLoading(true);
      try {
        const {data, error} = await supabase
          .from('ops')
          .select('*')
          .eq('patientId', patientId)
          .single();

        if (error) {
          console.log('Error fetching patient:', error.message);
        } else {
          setOpsData(data);
        }
      } catch (err) {
        console.error('Unexpected error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPatientData();
  }, [patientId, patientDob, patientPhone]);

  console.log('pt', opsData);

  const renderItem = ({item}: {item: any}) => (
    <View
      style={[
        styles.profileContainer,
        {
          backgroundColor: colorTheme.profileBg,
          paddingVertical: wp * 0.04,
        },
      ]}>
      <View
        style={[
          globalStyles.container,
          {justifyContent: 'space-between', marginBottom: wp * 0.06},
        ]}>
        <CustomText
          style={[styles.patientTxt, {color: colorTheme.textPrimary}]}>
          {item.doctorName}
        </CustomText>
        <CustomText
          style={{
            fontSize: wp * 0.05,
            color: colorTheme.borderColor,
          }}>
          {patientDob}
        </CustomText>
      </View>
      <CustomText style={{fontSize: wp * 0.04}}>{item.center}</CustomText>
      <View style={styles.statusContainer}>
        {item.status === 'Complete' ? <CheckCircleIcon /> : <LoadingIcon />}
        <CustomText style={{color: colorTheme.midPurple}}>
          {item.status}
        </CustomText>
      </View>
    </View>
  );

  return (
    <CustomView isSimpleView={true}>
      <View style={styles.mainContainer}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={[
            styles.backBtnContainer,
            {
              backgroundColor: colorTheme.textField,
              borderColor: colorTheme.borderColor,
            },
          ]}>
          <ArrowLeftIcon />
        </TouchableOpacity>
        <CustomText style={[globalStyles.headingText]}>Profile View</CustomText>
        {/* <View /> */}
      </View>
      {loading ? (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <LoadingIcon />
        </View>
      ) : (
        <FlatList
          data={opsData ? [opsData] : []}
          keyExtractor={item => item.id?.toString()}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          style={{flex: 1, paddingBottom: wp * 0.9}}
          ListEmptyComponent={
            !loading && <CustomText>No Patients Found</CustomText>
          }
        />
      )}
    </CustomView>
  );
};

export default PatientProfileDetails;
