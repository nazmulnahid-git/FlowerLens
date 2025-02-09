import { supabase } from '../lib/supabase';

export const getFlowerData = async (flower_id) => {

  try {
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

export const saveOrUnSaveFlower = async (flowerData) => {
  try {
    if (flowerData.id) {
      console.log('delete');
      const {error} = await supabase.from('saved_flowers').delete().eq('id', flowerData.id);
      if (error) {
        return {success: false, msg: error.message};
      }
      return {success: true};
    }
    const { data, error } = await supabase.from('saved_flowers').upsert(flowerData).select('*').single();
    if (error) {
      return {success: false, msg: error.message};
    }
    return {success: true, data};
  } catch (error) {
    return {success: false, msg: error.message};
  }
}

export const getSavedFlowers = async (user_id) => {
  try {
    const {data, error} = await supabase.from('saved_flowers').select(`*, details (flower_name)`).eq('user_id', user_id)
    .order('created_at', {ascending: false});
    if (error) {
      return {success: false};
    }
    return {success: true, data};
  } catch (error) {
    return {success: false};
  }
}