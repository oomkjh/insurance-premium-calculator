import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../redux/productSlice";
import { RootState, AppDispatch } from "../redux/store";
import axios from "axios";

const InsuranceForm: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { items: products, loading } = useSelector(
    (state: RootState) => state.products
  );

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    genderCd: "MALE",
    dob: "",
    planCode: "",
    premiumPerYear: 0,
  });
  const [result, setResult] = useState(null);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      genderCd: formData.genderCd,
      dob: formData.dob,
      planCode: formData.planCode,
      premiumPerYear: Number(formData.premiumPerYear),
      paymentFrequency: "YEARLY",
    };
    const res = await axios.post(
      `http://localhost:4000/api/premium-calculation`,
      payload
    );
    setResult(res.data);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-10 px-4">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-2xl">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6">
          Insurance Premium Calculator
        </h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              First Name
            </label>
            <input
              name="firstName"
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              placeholder="First Name"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Last Name
            </label>
            <input
              name="lastName"
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              placeholder="Last Name"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Gender
            </label>
            <select
              name="genderCd"
              onChange={handleChange}
              value={formData.genderCd}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            >
              <option value="MALE">Male</option>
              <option value="FEMALE">Female</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Date of Birth
            </label>
            <input
              type="date"
              name="dob"
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Insurance Plan
            </label>
            <select
              name="planCode"
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              required
            >
              <option value="">Select Plan</option>
              {loading ? (
                <option>Loading...</option>
              ) : (
                products.map((product: any) => (
                  <option key={product.planCode} value={product.planCode}>
                    {product.packageName} - {product.benefit}
                  </option>
                ))
              )}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Premium per Year
            </label>
            <input
              type="number"
              name="premiumPerYear"
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              placeholder="e.g. 30000"
              required
            />
          </div>

          <div className="pt-4">
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md"
            >
              Calculate
            </button>
          </div>
        </form>

        {result && (
          <div className="mt-6 bg-green-100 border border-green-400 text-green-800 p-4 rounded-lg">
            <h4 className="font-bold text-lg mb-2">Result</h4>
            <pre className="whitespace-pre-wrap break-words text-sm">
              {JSON.stringify(result, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
};

export default InsuranceForm;
