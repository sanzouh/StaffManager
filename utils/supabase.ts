import { createClient } from "@supabase/supabase-js";

// Create a single supabase client for interacting with your database

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.EXPO_PUBLIC_SUPABASE_KEY;

if (!supabaseUrl || !supabaseKey) {
	throw new Error("Supabase env variables are missing");
}

export const supabase = createClient(supabaseUrl, supabaseKey);

/* 	useEffect(() => {
	async function test() {
		const { data, error } = await supabase.from("employe").select("*");
		console.log(data, error);
	}
	test();
}, []); */
