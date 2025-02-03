import { supabase } from '../lib/supabase';

export const getUserData = async (user_id) => {
  try {
    const { data, error } = await supabase.from('users').select('*').eq('id', user_id).single();
    if (error) {
      return {success: false, msg: error.message};
    }
    return {success: true, data};
  } catch (error) {
    return {success: false, msg: error.message};
  }
};

export const updateUserData = async (user_id, data) => {
  try {
    const { error } = await supabase.from('users').update(data).eq('id', user_id);
    if (error) {
      return {success: false, msg: error.message};
    }
    return {success: true, data};
  } catch (error) {
    return {success: false, msg: error.message};
  }
};