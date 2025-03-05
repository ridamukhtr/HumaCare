import { createClient } from '@supabase/supabase-js';
import AsyncStorage from '@react-native-async-storage/async-storage';

const supabaseUrl = 'https://xfikxekuievtblgbdzan.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhmaWt4ZWt1aWV2dGJsZ2JkemFuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzk2Mjc0ODksImV4cCI6MjA1NTIwMzQ4OX0.K30Igrc47wdulgTUwBnUXVCH_JSioMtn_NI3Cku5kLo';

export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: { storage: AsyncStorage, autoRefreshToken: true, persistSession: true },
});
