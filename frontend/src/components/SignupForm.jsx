import { useState } from "react";
import singupdp from '../assets/form-dp.svg';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebase.js";
import { getFirebaseErrorMessage } from "../firebase/firebaseErrors.js"; // Import error handler


export default function SignupForm() {
  const [modalVisible, setModalVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const openModal = () => setModalVisible(true);
  const closeModal = () => setModalVisible(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      openModal();
    } catch (error) {
      // Use the custom error handler to get user-friendly messages
      const customMessage = getFirebaseErrorMessage(error.code);
      setError(customMessage);
    }
  };

  return (
    <div className="bg-secondary-color flex items-center justify-center min-h-screen playwrite">
      <div className="rounded-lg shadow-lg flex flex-col md:flex-row p-4 sm:p-6 md:p-8 max-w-4xl w-full">
        {/* Left section with illustration */}
        <div className="md:w-1/2 flex flex-col items-center justify-center p-4 sm:p-6 text-center">
          <h1 className="text-2xl sm:text-3xl font-bold text-primary-color mb-4">QuizWhiz</h1>
          <div className="w-40 h-40 sm:w-48 sm:h-48 bg-blue-100 rounded-full flex items-center justify-center mb-6">
            <img src={singupdp} alt="QuizWhiz Logo" className="lg:w-full" />
          </div>
        </div>

        {/* Right section with form */}
        <div className="md:w-1/2 p-4 sm:p-6 bg-[#d4e5dc] rounded-lg">
          <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-gray-800 text-center md:text-left">Create a New Account</h2>
          <p className="text-gray-600 mb-6 text-sm sm:text-base text-center md:text-left">Join QuizWhiz Today</p>

          {error && <p className="text-red-500 text-center">{error}</p>}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="full-name" className="block text-sm font-medium text-gray-700">Full Name</label>
              <input type="text" id="full-name" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary-color focus:border-primary-color sm:text-sm" />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
              <input 
                type="email" 
                id="email" 
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary-color focus:border-primary-color sm:text-sm" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
              <input 
                type="password" 
                id="password" 
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary-color focus:border-primary-color sm:text-sm" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700">Confirm Password</label>
              <input 
                type="password" 
                id="confirm-password" 
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary-color focus:border-primary-color sm:text-sm" 
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="class" className="block text-sm font-medium text-gray-700">Enter your class</label>
              <input type="text" id="class" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary-color focus:border-primary-color sm:text-sm" />
            </div>
            <div>
              <button 
                type="submit" 
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-color hover:bg-light-pink focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-color"
              >
                Sign Up
              </button>
            </div>
          </form>

          <p className="mt-4 text-center text-gray-600 text-sm">
            Already have an account? <a href="#" className="text-primary-color hover:underline">Log in</a>
          </p>
        </div>
      </div>

      {/* Modal */}
      {modalVisible && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg w-80">
            <h2 className="text-xl font-semibold text-gray-800">You have successfully signed up!</h2>
            <div className="mt-4 flex justify-center">
              <button onClick={closeModal} className="px-4 py-2 bg-primary-color text-white rounded-md">
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
