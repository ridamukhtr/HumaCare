import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import CustomView from '../components/customComponents/CustomView';
import CustomText from '../components/customComponents/CustomText';
import globalStyles, {FONTS} from '../styles/globalStyles';
import {wp} from '../styles/theme-styles';
import CustomTextInput from '../components/customComponents/CustomTextInput';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {selectedThemeSelector} from '../redux/themeReducer';
import useThemeManager from '../lib/customHooks/useThemeManger';
import {useSelector} from 'react-redux';
import {CheckCircleIcon, SearchIcon} from '../assets/svgIcons';
import {styles} from '../styles/patientScreenStyles';
import PatientDetailCardView from '../components/views/PatientDetailCardView';
import {supabase} from '../config/supabaseClient';
import {ROUTES} from '../routes/RoutesConstants';
import {FlatList} from 'react-native-gesture-handler';

const CalenderScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const [opsData, setOpsData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filteredData, setFilteredData] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  const theme = useSelector(selectedThemeSelector);
  const {colorTheme} = useThemeManager(theme);

  useEffect(() => {
    const fetchAllOpsData = async () => {
      setLoading(true);
      try {
        const {data, error} = await supabase.from('ops').select('*');

        if (error) {
          console.log('Error fetching ops data:', error.message);
        } else {
          setOpsData(data);
          setFilteredData(data);
        }
      } catch (err) {
        console.error('Unexpected error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAllOpsData();
  }, []);

  console.log('epi', opsData);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (!query) {
      setFilteredData(opsData); // Reset if search is cleared
    } else {
      const lowerQuery = query.toLowerCase();
      const filtered = opsData.filter(
        item =>
          item.doctorName?.toLowerCase().includes(lowerQuery) ||
          item.patientName?.toLowerCase().includes(lowerQuery),
      );
      setFilteredData(filtered);
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
    <PatientDetailCardView
      title={item.doctorName || 'Unknown Doctor'}
      date={
        item.createdAt
          ? new Date(item.createdAt).toLocaleDateString('de-DE')
          : 'No Date'
      }
      name={item.patientName || 'No Name'}
      description={item.center || 'No Description'}
      status={item.status || 'Pending'}
      onPress={() => navigation.navigate(ROUTES.screenCalenderDetail)}
    />
  );

  return (
    <CustomView isSimpleView={true}>
      <CustomText style={globalStyles.headingText}>Episodes</CustomText>
      <View style={[globalStyles.container, {marginVertical: wp * 0.07}]}>
        <CustomTextInput
          inputBodyStyle={{
            width: wp * 0.7,
            marginRight: wp * 0.02,
          }}
          value={searchQuery}
          onChangeText={handleSearch}
          placeholder="Search Patient Data"
        />
        <SearchView />
      </View>
      <FlatList
        data={filteredData}
        keyExtractor={item => item.id?.toString() || Math.random().toString()}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        style={{flex: 1, paddingBottom: wp * 0.9}}
        ListEmptyComponent={
          !loading && <CustomText>No Patients Found</CustomText>
        }
      />
    </CustomView>
  );
};

export default CalenderScreen;
