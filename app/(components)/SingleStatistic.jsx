import { Card, CardContent, Typography } from "@mui/material";

const SingleStatistic = ({ title, data, icon }) => {
  return (
    <Card className="rounded-full mb-2 shadow-inner">
      <CardContent className="w-full flex flex-col items-center justify-center gap-2">
        <div className="flex items-center gap-2">
          <div className="flex items-start">{icon}</div>
          <Typography variant="h4" fontWeight={500} component="div">
            {data}
          </Typography>
        </div>
        <Typography variant="p" sx={{ fontSize: 16 }} color="grey" gutterBottom>
          {title}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default SingleStatistic;
