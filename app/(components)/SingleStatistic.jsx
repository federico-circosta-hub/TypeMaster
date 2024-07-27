import { Card, CardContent, Typography } from "@mui/material";

const SingleStatistic = ({ title, data, icon }) => {
  return (
    <Card style={{ borderRadius: "60px" }} className="mb-2 shadow-inner">
      <CardContent className="w-full flex flex-col items-center justify-center gap-2 p-4">
        <div className="flex items-center gap-2">
          <div className="flex items-start">{icon}</div>
          <Typography variant="h5" fontWeight={500} component="div">
            {data}
          </Typography>
        </div>
        <Typography variant="p" sx={{ fontSize: 14 }} color="grey" gutterBottom>
          {title}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default SingleStatistic;
