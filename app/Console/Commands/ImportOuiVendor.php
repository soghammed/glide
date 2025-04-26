<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\DeviceOui;

class ImportOuiVendor extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:import-oui-vendor';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $file = storage_path('app/oui.csv');

        //import csv file into php array
        $csv = array_map('str_getcsv', file($file));

        //remove first row (headers)
        array_shift($csv);

        $this->info('Importing data..');

        //track progress
        $this->output->progressStart(count($csv));


        //empty table
        DeviceOui::truncate();

        //loop through each row and save to db
        foreach ($csv as $row) {
            
            //create new record
            DeviceOui::create([
                'registry' => trim($row[0]),
                'assignment' => trim($row[1]),
                'organization_name' => trim($row[2]),
                'organization_address' => trim($row[3]),
            ]);

            $this->output->progressAdvance();
        }

        $this->output->progressFinish();

        $this->info('Data imported successfully.');

        return 1;
    }
}
