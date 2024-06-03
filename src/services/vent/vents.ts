import supabase from '../../lib/helper/supabaseClient';

// Function to insert a vent
export const insertVent = async (vent) => {
  try {
    const { data, error } = await supabase
      .from('vents')
      .insert([vent]);

    if (error) {
      throw new Error(error.message);
    }

    return data;
  } catch (error) {
    console.error('Insert Vent Error:', error);
    throw new Error('Failed to insert vent.');
  }
};

// Function to fetch all vents
export const fetchVents = async () => {
  try {
    const { data, error } = await supabase
      .from('vents')
      .select('*');

    if (error) {
      throw new Error(error.message);
    }

    return data;
  } catch (error) {
    console.error('Fetch Vents Error:', error);
    throw new Error('Failed to fetch vents.');
  }
};

// Function to fetch a single vent by ID
export const fetchVentById = async (id) => {
  try {
    const { data, error } = await supabase
      .from('vents')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      throw new Error(error.message);
    }

    return data;
  } catch (error) {
    console.error('Fetch Vent Error:', error);
    throw new Error('Failed to fetch vent.');
  }
};

// Function to update a vent by ID
export const updateVent = async (id, updates) => {
  try {
    const { data, error } = await supabase
      .from('vents')
      .update(updates)
      .eq('id', id);

    if (error) {
      throw new Error(error.message);
    }

    return data;
  } catch (error) {
    console.error('Update Vent Error:', error);
    throw new Error('Failed to update vent.');
  }
};

// Function to delete a vent by ID
export const deleteVent = async (id) => {
  try {
    const { error } = await supabase
      .from('vents')
      .delete()
      .eq('id', id);

    if (error) {
      throw new Error(error.message);
    }
  } catch (error) {
    console.error('Delete Vent Error:', error);
    throw new Error('Failed to delete vent.');
  }
};
