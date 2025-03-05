import {ScrollView, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import CustomView from '../components/customComponents/CustomView';
import CustomText from '../components/customComponents/CustomText';
import {hp, wp} from '../styles/theme-styles';
import {useSelector} from 'react-redux';
import {selectedThemeSelector} from '../redux/themeReducer';
import useThemeManager from '../lib/customHooks/useThemeManger';
import globalStyles, {FONTS} from '../styles/globalStyles';
import CustomTextInput from '../components/customComponents/CustomTextInput';
import {SearchIcon} from '../assets/svgIcons';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {ROUTES} from '../routes/RoutesConstants';
import {styles} from '../styles/patientScreenStyles';
import {supabase} from '../config/supabaseClient';
import {FlatList} from 'react-native-gesture-handler';

const PatientScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const theme = useSelector(selectedThemeSelector);
  const {colorTheme} = useThemeManager(theme);

  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);
  const [filteredPatients, setFilteredPatients] = useState<Patient[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    setLoading(true);
    const {data, error} = await supabase.from('patient').select('*');

    if (error) {
      console.log('Error fetching patients:', error);
    } else {
      setPatients(data);
      setFilteredPatients(data);
    }

    setLoading(false);
  };

  console.log('patient', patients);

  const handleSearch = (query: string) => {
    const searchText = query?.toString().trim() || '';
    setSearchQuery(searchText);

    if (searchText === '') {
      setFilteredPatients(patients);
    } else {
      const filteredData = patients.filter(patient =>
        patient?.name?.toLowerCase().includes(searchText.toLowerCase()),
      );
      setFilteredPatients(filteredData);
    }
  };

  const SearchView = () => {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={handleSearch}
        style={[
          styles.searchContainer,
          {
            backgroundColor: colorTheme.btnColor,
            borderColor: colorTheme.borderColor,
          },
        ]}>
        <SearchIcon />
      </TouchableOpacity>
    );
  };

  const renderItem = ({item}: {item: any}) => (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate(ROUTES.screenPatientProfileDetails, {
          patientId: item?.id,
          patientDob: item?.dob,
          patientPhone: item?.phone,
        })
      }
      style={[
        styles.profileContainer,
        {backgroundColor: colorTheme.profileBg},
      ]}>
      <View style={[globalStyles.container, {justifyContent: 'space-between'}]}>
        <CustomText style={[styles.nameText, {color: colorTheme.textPrimary}]}>
          {item.name}
        </CustomText>
        <CustomText style={{color: colorTheme.textPrimary}}>
          {item.dob}
        </CustomText>
      </View>
      <CustomText
        style={[
          styles.nameText,
          {
            fontWeight: '500',
            fontFamily: FONTS.medium,
            color: colorTheme.textPrimary,
          },
        ]}>
        {item.phone}
      </CustomText>
    </TouchableOpacity>
  );
  return (
    <CustomView isSimpleView={true}>
      <CustomText style={globalStyles.headingText}>Patients</CustomText>
      <View style={[globalStyles.container, {marginVertical: wp * 0.07}]}>
        <CustomTextInput
          inputBodyStyle={{
            width: wp * 0.7,
            marginRight: wp * 0.02,
          }}
          value={searchQuery}
          onChangeText={text => handleSearch(text)}
          placeholder="Search Patient Data"
        />
        <SearchView />
      </View>

      <FlatList
        data={filteredPatients}
        keyExtractor={item => item?.id?.toString()}
        renderItem={renderItem}
        style={{flex: 1, paddingBottom: wp * 0.9}}
        ListEmptyComponent={
          !loading && <CustomText>No Patients Found</CustomText>
        }
      />
    </CustomView>
  );
};

export default PatientScreen;
