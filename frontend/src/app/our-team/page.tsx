import MembersGrid from "./MemberCard";
export default function OurTeam() {
  return (
    <div className="mt-[160px] sm:mt-[120px] md:mt-[140px] lg:mt-[120px]">
      <div className="flex flex-col items-center gap-6 max-w-6xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-white text-center">Our Team</h1>
        <div className="flex flex-wrap justify-center gap-6">
          <div className="w-64 p-4 flex flex-col items-center bg-white rounded-lg shadow-lg border-2 border-transparent bg-gradient-to-br from-blue-100 to-white transition-transform hover:scale-105">
            <img
              src="/api/placeholder/300/300"
              alt="Faculty Coordinator"
              className="w-40 h-40 rounded-full object-cover mb-4 border-4 border-blue-500 "
            />
            <h3 className="text-lg font-semibold text-gray-800 text-center">
              T.N Chandrika
            </h3>
            <p className="text-sm text-gray-700 text-center">
              Faculty Coordinator
            </p>
          </div>
        </div>
        <hr className="w-full h-1 bg-gradient-to-r from-orange-500 via-orange-400 to-orange-300 border-0 rounded-full opacity-100 transform scale-x-100 origin-left" />
        <div className="flex flex-wrap justify-center gap-6">
          {[
            { name: "Karthik B.M", role: "Founder" },
            { name: "Adithya P.M", role: "Founder" },
            { name: "Bharath G.C", role: "Founder" },
            { name: "Susheen C.M", role: "Founder" },
          ].map((member, index) => (
            <div
              key={index}
              className="w-64 p-4 flex flex-col items-center bg-white rounded-lg shadow-lg border-2 border-transparent bg-gradient-to-br from-blue-100 to-white hover:shadow-xl transition-transform hover:scale-105"
            >
              <img
                src="/api/placeholder/300/300"
                alt={member.role}
                className="w-40 h-40 rounded-full object-cover mb-4 border-4 border-blue-500"
              />
              <h3 className="text-lg font-semibold text-gray-800 text-center">
                {member.name}
              </h3>
              <p className="text-sm text-gray-700 text-center">{member.role}</p>
            </div>
          ))}
        </div>
      </div>
      
      <MembersGrid />
    </div>
  );
}