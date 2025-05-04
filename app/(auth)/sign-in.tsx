import { useSignIn } from "@clerk/clerk-expo";
import { Link, useRouter } from "expo-router";
import React from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";

export default function SignInScreen() {
  const { signIn, setActive, isLoaded } = useSignIn();
  const router = useRouter();

  const [emailAddress, setEmailAddress] = React.useState("");
  const [password, setPassword] = React.useState("");

  // Handle the submission of the sign-in form
  const onSignInPress = async () => {
    if (!isLoaded) return;

    // Start the sign-in process using the email and password provided
    try {
      const signInAttempt = await signIn.create({
        identifier: emailAddress,
        password,
      });

      // If sign-in process is complete, set the created session as active
      // and redirect the user
      if (signInAttempt.status === "complete") {
        await setActive({ session: signInAttempt.createdSessionId });
        router.replace("/");
      } else {
        // If the status isn't complete, check why. User might need to
        // complete further steps.
        console.error(JSON.stringify(signInAttempt, null, 2));
      }
    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2));
    }
  };

  return (
    <View className="flex-1 justify-center items-center p-6">
      <Text className="font-semibold text-3xl text-gray-100 mb-8">
        Welcome Back
      </Text>
      <View className="gap-2 w-full mb-6">
        <Text className="text-gray-100 font-semibold">Email</Text>
        <TextInput
          autoCapitalize="none"
          value={emailAddress}
          placeholder="Enter email"
          onChangeText={(emailAddress) => setEmailAddress(emailAddress)}
          className="bg-slate-800/60 text-gray-100 w-full p-6 rounded-lg"
          placeholderTextColor="#9CA3AF"
        />
      </View>
      <View className="gap-2 w-full mb-8">
        <Text className="text-gray-100 font-semibold">Password</Text>
        <TextInput
          value={password}
          placeholder="Enter password"
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
          className="bg-slate-800/60 text-gray-100 w-full p-6 rounded-lg"
          placeholderTextColor="#9CA3AF"
        />
      </View>

      <TouchableOpacity
        onPress={onSignInPress}
        className="w-full p-6 rounded-lg bg-emerald-500"
      >
        <Text className="font-medium text-gray-100 text-center">Continue</Text>
      </TouchableOpacity>
      <View
        style={{ display: "flex", flexDirection: "row", gap: 3 }}
        className="mt-4"
      >
        <Text className="text-gray-400">Don&apos;t have an account?</Text>
        <Link href="/sign-up">
          <Text className="text-medium text-emerald-500 underline">
            Sign up
          </Text>
        </Link>
      </View>
    </View>
  );
}
