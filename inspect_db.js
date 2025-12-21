
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error('Missing Supabase environment variables');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function inspectSchema() {
    console.log('--- INSPECTING CASAS ---');
    const { data: casas } = await supabase.from('casas').select('*').limit(1);
    if (casas && casas.length > 0) {
        console.log('Columns:', Object.keys(casas[0]));
        const videoField = Object.keys(casas[0]).find(k => k.toLowerCase().includes('video'));
        if (videoField) console.log('FOUND VIDEO FIELD:', videoField, casas[0][videoField]);
    } else {
        console.log('No rows in casas');
    }

    console.log('\n--- INSPECTING TERRENOS ---');
    const { data: terrenos } = await supabase.from('terrenos').select('*').limit(1);
    if (terrenos && terrenos.length > 0) {
        console.log('Columns:', Object.keys(terrenos[0]));
        const videoField = Object.keys(terrenos[0]).find(k => k.toLowerCase().includes('video'));
        if (videoField) console.log('FOUND VIDEO FIELD IN TERRENOS:', videoField, terrenos[0][videoField]);
    }

    console.log('\n--- INSPECTING CASA_IMAGEN ---');
    const { data: img } = await supabase.from('casa_imagen').select('*').limit(5);
    if (img && img.length > 0) {
        console.log('Columns:', Object.keys(img[0]));
        // Check for mp4
        const mp4Video = img.find(i => i.url && i.url.toLowerCase().includes('.mp4'));
        if (mp4Video) {
            console.log('FOUND MP4 IN CASA_IMAGEN:', mp4Video);
        } else {
            console.log('No mp4 found in first 5 images');
        }
    }
}

inspectSchema();
