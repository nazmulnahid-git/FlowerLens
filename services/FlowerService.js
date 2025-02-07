import { supabase } from '../lib/supabase';

export const getFlowerData = async (flower_id) => {

  try {
    console.log(flower_id);
    const { data, error } = await supabase.from('details').select('*').eq('id', flower_id).single();
    if (error) {
      console.log('error');
      return {success: false, msg: error.message};
    }
    return {success: true, data};
  } catch (error) {
    return {success: false, msg: error.message};
  }
};