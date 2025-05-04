import { useSignUp } from "@clerk/clerk-expo";
import { Link, useRouter } from "expo-router";
import * as React from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";

export default function SignUpScreen() {
  const { isLoaded, signUp, setActive } = useSignUp();
  const router = useRouter();

  const [emailAddress, setEmailAddress] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [pendingVerification, setPendingVerification] = React.useState(false);
  const [code, setCode] = React.useState("");

  // Handle submission of sign-up form
  const onSignUpPress = async () => {
    if (!isLoaded) return;

    // Start sign-up process using email and password provided
    try {
      await signUp.create({
        emailAddress,
        password,
      });

      // Send user an email with verification code
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      // Set 'pendingVerification' to true to display second form
      // and capture OTP code
      setPendingVerification(true);
    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2));
    }
  };

  // Handle submission of verification form
  const onVerifyPress = async () => {
    if (!isLoaded) return;

    try {
      // Use the code the user provided to attempt verification
      const signUpAttempt = await signUp.attemptEmailAddressVerification({
        code,
      });

      // If verification was completed, set the session to active
      // and redirect the user
      if (signUpAttempt.status === "complete") {
        await setActive({ session: signUpAttempt.createdSessionId });
        router.replace("/");
      } else {
        // If the status is not complete, check why. User may need to
        // complete further steps.
        console.error(JSON.stringify(signUpAttempt, null, 2));
      }
    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2));
    }
  };

  if (pendingVerification) {
    return (
      <View className="flex-1 bg-gray-900 p-6">
        <View className="flex-1 justify-center">
          <Text className="text-3xl font-bold text-center mb-8 text-white">
            Verify Your Email
          </Text>

          <View className="gap-4">
            <View>
              <Text className="text-sm font-medium text-gray-300 mb-1">
                Verification Code
              </Text>
              <TextInput
                className="w-full p-4 border border-gray-700 rounded-lg bg-gray-800 text-white"
                value={code}
                placeholder="Enter your verification code"
                placeholderTextColor="#9CA3AF"
                onChangeText={setCode}
              />
            </View>

            <TouchableOpacity
              className="w-full bg-emerald-400 p-4 rounded-lg mt-6"
              onPress={onVerifyPress}
            >
              <Text className="text-white text-center font-semibold">
                Verify Email
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }

  return (
    <View className="flex-1 justify-center p-6">
      <>
        <Text className="text-3xl font-semibold text-center mb-8 text-gray-100">
          Create Account
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
          onPress={onSignUpPress}
          className="w-full p-6 rounded-lg bg-emerald-500"
        >
          <Text className="font-medium text-gray-100 text-center">
            Continue
          </Text>
        </TouchableOpacity>
        <View
          style={{ display: "flex", flexDirection: "row", gap: 3 }}
          className="mt-4  justify-center"
        >
          <Text className="text-gray-400">Already have an account?</Text>
          <Link href="/sign-in">
            <Text className="text-medium text-emerald-500 underline">
              Login
            </Text>
          </Link>
        </View>
      </>
    </View>
  );
}
